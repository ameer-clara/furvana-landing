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
  ScanFace,
  Users,
  HeartPulse,
  Scale,
  Candy,
  ImagePlus,
  Video,
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

export const SOFTWARE: FeatureItem[] = [
  {
    icon: ScanFace,
    title: "AI Pet Recognition",
    description:
      "On-device AI learns each pet's face and coat, greeting them by name and tailoring every session—even in a multi-pet home.",
  },
  {
    icon: Users,
    title: "Care Marketplace",
    description:
      "Post a photo and find trusted local sitters and groomers to pamper your furry friend when life gets busy.",
  },
  {
    icon: HeartPulse,
    title: "Health Insights",
    description:
      "Weight trends, grooming history, and gentle nudges turn everyday sessions into a clear picture of your pet's wellbeing.",
  },
];

export const MARKETPLACE_STEPS: FeatureItem[] = [
  {
    icon: ImagePlus,
    title: "Post your pet",
    description:
      "Share a photo, breed, and a few care notes in seconds—Furvana fills in the details it already knows.",
  },
  {
    icon: Users,
    title: "Match with sitters",
    description:
      "Get matched with background-checked sitters and groomers nearby, with ratings from other pet parents.",
  },
  {
    icon: Video,
    title: "Watch & relax",
    description:
      "They care for your friend while you follow along on live HD video and two-way audio from anywhere.",
  },
];

export const HARDWARE: FeatureItem[] = [
  {
    icon: Scale,
    title: "Load-Sensor Base",
    description:
      "A precision load cell built into the base weighs your pet every visit—tracking healthy trends to ±0.05 lb.",
  },
  {
    icon: Candy,
    title: "Auto Treat Dispenser",
    description:
      "A built-in tube rewards calm grooming with a perfectly timed treat, reinforcing good habits automatically.",
  },
  {
    icon: Leaf,
    title: "Organic Treat Cartridges",
    description:
      "Refillable cartridges pair with premium organic brands, so every reward is as wholesome as it is delicious.",
  },
];

export const TREAT_PILLS: string[] = [
  "USDA Organic",
  "Grain-free",
  "Vet-formulated",
  "Single-ingredient",
  "Limited-ingredient",
  "No fillers",
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
  { icon: Scale, value: "\u00B10.05 lb", label: "Weight precision" },
  { icon: Candy, value: "60-treat", label: "Dispenser hopper" },
];
