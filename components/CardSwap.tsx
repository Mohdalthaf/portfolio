"use client";

import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  onActiveChange?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  className?: string;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export function Card({
  customClass,
  ref,
  ...rest
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
  );
}

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onActiveChange,
  skewAmount = 6,
  easing = 'elastic',
  className = '',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );

  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);
  const onActiveChangeRef = useRef(onActiveChange);

  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    const total = childArr.length;
    if (total < 2) return;

    order.current = Array.from({ length: total }, (_, i) => i);

    const notifyActive = (index: number) => {
      onActiveChangeRef.current?.(index);
    };

    const getCards = () =>
      cardEls.current.slice(0, total).filter((el): el is HTMLDivElement => Boolean(el));

    const initCards = () => {
      const cards = getCards();
      if (cards.length !== total) return false;

      cards.forEach((el, i) => {
        placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      });

      return true;
    };

    let initRetryId = 0;
    let hoverRetryId = 0;
    let cancelled = false;

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = cardEls.current[front];
      if (!elFront || rest.length === 0) return;

      notifyActive(rest[0]);

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = cardEls.current[idx];
        if (!el) return;

        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    const start = () => {
      if (cancelled) return;

      if (!initCards()) {
        initRetryId = window.requestAnimationFrame(start);
        return;
      }

      notifyActive(order.current[0]);
      swap();
      intervalRef.current = window.setInterval(swap, delay);
    };

    start();

    let removeHoverListeners: (() => void) | undefined;

    if (pauseOnHover) {
      const attachHover = () => {
        const node = container.current;
        if (!node) {
          hoverRetryId = window.requestAnimationFrame(attachHover);
          return;
        }

        const pause = () => {
          tlRef.current?.pause();
          window.clearInterval(intervalRef.current);
        };
        const resume = () => {
          tlRef.current?.play();
          intervalRef.current = window.setInterval(swap, delay);
        };

        node.addEventListener('mouseenter', pause);
        node.addEventListener('mouseleave', resume);

        removeHoverListeners = () => {
          node.removeEventListener('mouseenter', pause);
          node.removeEventListener('mouseleave', resume);
        };
      };

      attachHover();
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(initRetryId);
      window.cancelAnimationFrame(hoverRetryId);
      window.clearInterval(intervalRef.current);
      tlRef.current?.kill();
      tlRef.current = null;
      removeHoverListeners?.();
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: child.key ?? i,
          ref: (node: HTMLDivElement | null) => {
            cardEls.current[i] = node;
          },
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={`absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55] ${className}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
