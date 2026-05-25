import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Camera,
  Mic,
  Waves,
  Bell,
  Ruler,
  ShieldCheck,
  VolumeX,
  Leaf,
  Plug,
  RotateCw,
} from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SpecItem {
  icon: LucideIcon;
  value: string;
  label: string;
  rotate?: boolean;
}

export const FEATURES: FeatureItem[] = [
  {
    icon: Activity,
    title: "Motion Activated",
    description:
      "Detects your pet the moment they arrive and starts gently, no buttons to press.",
  },
  {
    icon: Camera,
    title: "Live Camera",
    description:
      "A 1080p HD wide-angle lens lets you watch your pet in real-time from anywhere.",
  },
  {
    icon: Mic,
    title: "Two-Way Audio",
    description:
      "Built-in mic and speaker so you can talk to and hear your furry friend.",
  },
  {
    icon: Waves,
    title: "Reciprocating Wedge Pads",
    description:
      "50° forward/backward silicone oscillation delivers a deep yet gentle massage.",
  },
  {
    icon: Bell,
    title: "App Alerts",
    description:
      "Get notified of activity and grooming time, right on your phone.",
  },
  {
    icon: Ruler,
    title: "Grows With Your Pet",
    description:
      "Telescoping sides adjust in both height and width to fit cats and small dogs.",
  },
];

export const TRUST: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "Pet-safe materials and rounded edges.",
  },
  {
    icon: VolumeX,
    title: "Whisper Quiet",
    description: "Low-noise motor won't startle pets.",
  },
  {
    icon: Leaf,
    title: "Easy to Clean",
    description: "Removable pads and washable mat.",
  },
  {
    icon: Plug,
    title: "USB-C Power",
    description: "5V low-voltage for home safety.",
  },
];

export const SPECS: SpecItem[] = [
  { icon: Ruler, value: "9.5\u201315\u2033", label: "Adjustable height" },
  {
    icon: Ruler,
    value: "10.5\u201316.5\u2033",
    label: "Adjustable width",
    rotate: true,
  },
  { icon: RotateCw, value: "50\u00B0", label: "Oscillation arc" },
  { icon: Camera, value: "1080p", label: "HD wide-angle" },
];
