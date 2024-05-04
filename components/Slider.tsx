"use client";
import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}
//this component can be used for custom volume slider
export default function Slider({ value = 1, onChange }: SliderProps) {
  const handleChange = (value: number[]) => {
    onChange?.(value[0]);
  };
  return (
    <RadixSlider.Root
      defaultValue={[1]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
      value={[value]}
      className="relative flex items-center select-none touch-none w-full h-10"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full " />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}
