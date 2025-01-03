export const animations = {
  fadeIn: "animate-[fadeIn_0.3s_ease-in-out]",
  slideUp: "animate-[slideUp_0.3s_ease-out]",
  pulse: "animate-[pulse_2s_ease-in-out_infinite]",
  shimmer: "animate-[shimmer_2s_linear_infinite]",
  slideInRight: "animate-[slideInRight_0.3s_ease-out]"
} as const;

export type AnimationName = keyof typeof animations;