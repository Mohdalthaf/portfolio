"use client";

import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  itemCount?: number;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

function applyCardSpacing(
  cards: HTMLElement[],
  {
    itemDistance,
  }: {
    itemDistance: number;
  }
) {
  cards.forEach((card, i) => {
    card.style.marginBottom = i < cards.length - 1 ? `${itemDistance}px` : '0';
  });
}

function cacheCardBaseTops(cards: HTMLElement[]) {
  cards.forEach((card) => {
    card.style.transform = 'translateZ(0)';
    card.style.filter = '';
    const rect = card.getBoundingClientRect();
    card.dataset.stackBaseTop = String(rect.top + window.scrollY);
  });
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  innerClassName = '',
  itemCount,
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const maxScrollRef = useRef(0);
  const smoothScrollRef = useRef(0);

  const easeOutCubic = useCallback((t: number) => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      const scrollTop =
        lenisRef.current?.scroll ??
        smoothScrollRef.current ??
        window.scrollY;

      return {
        scrollTop,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : 0,
      scrollContainer: scroller
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const cached = element.dataset.stackBaseTop;
        if (cached) return parseFloat(cached);

        let top = 0;
        let node: HTMLElement | null = element;
        while (node) {
          top += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return top;
      }

      return element.offsetTop;
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight, scrollContainer } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null;

    const endElementTop = endElement ? getElementOffset(endElement) : 0;
    const pinEnd =
      maxScrollRef.current > 0
        ? maxScrollRef.current
        : endElementTop - containerHeight / 2;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      const scaleProgress = easeOutCubic(
        calculateProgress(scrollTop, triggerStart, triggerEnd)
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lerpFactor = useWindowScroll
        ? Math.min(1, 0.12 + scaleDuration * 0.06)
        : 1;
      const lerpValue = (from: number, to: number) =>
        from + (to - from) * lerpFactor;

      const previousTransform = lastTransformsRef.current.get(i);
      const appliedTransform = previousTransform && useWindowScroll
        ? {
            translateY: Math.round(lerpValue(previousTransform.translateY, newTransform.translateY) * 100) / 100,
            scale: Math.round(lerpValue(previousTransform.scale, newTransform.scale) * 1000) / 1000,
            rotation: Math.round(lerpValue(previousTransform.rotation, newTransform.rotation) * 100) / 100,
            blur: Math.round(lerpValue(previousTransform.blur, newTransform.blur) * 100) / 100,
          }
        : newTransform;

      const lastTransform = previousTransform;
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - appliedTransform.translateY) > 0.05 ||
        Math.abs(lastTransform.scale - appliedTransform.scale) > 0.0005 ||
        Math.abs(lastTransform.rotation - appliedTransform.rotation) > 0.05 ||
        Math.abs(lastTransform.blur - appliedTransform.blur) > 0.05;

      if (hasChanged) {
        const transform = `translate3d(0, ${appliedTransform.translateY}px, 0) scale(${appliedTransform.scale}) rotate(${appliedTransform.rotation}deg)`;
        const filter = appliedTransform.blur > 0 ? `blur(${appliedTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, appliedTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    easeOutCubic,
    parsePercentage,
    getScrollData,
    getElementOffset,
    scaleDuration,
  ]);

  const clampScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || useWindowScroll) return false;

    const max = maxScrollRef.current;
    if (max <= 0) return false;

    const { scrollTop } = scroller;
    if (scrollTop > max) {
      scroller.scrollTop = max;
      return true;
    }

    if (scrollTop < 0) {
      scroller.scrollTop = 0;
      return true;
    }

    return false;
  }, [useWindowScroll]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const measureScrollBounds = useCallback(
    (recachePositions = false) => {
      const container = scrollerRef.current;
      const inner = container?.querySelector('.scroll-stack-inner') as HTMLElement | null;
      const cards = cardsRef.current;

      if (!container || !inner || !cards.length) return;

      applyCardSpacing(cards, { itemDistance });

      const containerHeight = useWindowScroll
        ? window.innerHeight
        : container.clientHeight;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const lastIndex = cards.length - 1;
      const lastCard = cards[lastIndex];
      const lastCardTopRel = lastCard.offsetTop;
      const lastPinStartRel =
        lastCardTopRel - stackPositionPx - itemStackDistance * lastIndex;
      const maxScrollRel = Math.max(0, lastPinStartRel + itemDistance);

      const endMarker = inner.querySelector('.scroll-stack-end') as HTMLElement | null;
      const contentHeight = endMarker?.offsetTop ?? inner.scrollHeight;

      if (useWindowScroll) {
        if (recachePositions) {
          cacheCardBaseTops(cards);
        }

        const lastPinStartAbs =
          getElementOffset(lastCard) - stackPositionPx - itemStackDistance * lastIndex;
        maxScrollRef.current = Math.max(0, lastPinStartAbs + itemDistance);

        const contentEndAbs = getElementOffset(inner) + contentHeight;
        const paddingBottom = Math.max(
          0,
          maxScrollRef.current - contentEndAbs + itemStackDistance
        );
        inner.style.paddingBottom = `${paddingBottom}px`;
        lenisRef.current?.resize();
      } else {
        const paddingBottom = Math.max(
          0,
          maxScrollRel + containerHeight - contentHeight
        );
        inner.style.paddingBottom = `${paddingBottom}px`;
        maxScrollRef.current = maxScrollRel;
        lenisRef.current?.resize();
      }

      updateCardTransforms();
    },
    [
      itemDistance,
      itemStackDistance,
      stackPosition,
      parsePercentage,
      updateCardTransforms,
      useWindowScroll,
      getElementOffset,
    ]
  );

  const setupLenis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
        infinite: false,
        wheelMultiplier: 0.9,
        lerp: 0.085,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        smoothScrollRef.current = lenis.scroll;
        updateCardTransforms();
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }

    const scroller = scrollerRef.current;
    if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
        allowNestedScroll: true,
        prevent: (node) => !scroller.contains(node),
      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        clampScroll();
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
  }, [handleScroll, useWindowScroll, clampScroll, updateCardTransforms]);

  useLayoutEffect(() => {
    const container = scrollerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;
    let layoutSyncId: number | null = null;

    cards.forEach((card) => {
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    const onWindowResize = () => {
      measureScrollBounds(true);
    };

    setupLenis();
    measureScrollBounds(true);

    if (useWindowScroll) {
      layoutSyncId = window.requestAnimationFrame(() => {
        layoutSyncId = window.requestAnimationFrame(() => {
          layoutSyncId = null;
          measureScrollBounds(true);
        });
      });
      window.addEventListener('load', onWindowResize, { once: true });
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measureScrollBounds(false))
        : null;

    resizeObserver?.observe(container);
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (layoutSyncId !== null) {
        cancelAnimationFrame(layoutSyncId);
      }
      window.removeEventListener('load', onWindowResize);
      resizeObserver?.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      maxScrollRef.current = 0;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    setupLenis,
    handleScroll,
    updateCardTransforms,
    measureScrollBounds,
  ]);

  return (
    <div
      className={
        useWindowScroll
          ? `scroll-stack-scroller relative w-full ${className}`.trim()
          : `scroll-stack-scroller relative h-full w-full overflow-x-hidden overflow-y-auto ${className}`.trim()
      }
      ref={scrollerRef}
      style={
        useWindowScroll
          ? undefined
          : {
              overscrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch',
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
            }
      }
    >
      <div
        className={`scroll-stack-inner relative mx-auto w-full max-w-6xl px-6 pt-4 md:px-6 ${innerClassName}`.trim()}
      >
        {children}
        <div className="scroll-stack-end h-px w-full" aria-hidden />
      </div>
    </div>
  );
};

export default ScrollStack;
