import { BookOpen, Headphones, HelpCircle, Layers, MessageSquare, Volume2 } from "lucide-react";

export const STATS = [
  {
    value: "vocabulary",
    label: "learn.stats.vocab",
    bg: "bg-blue-500"
  },
  {
    value: "grammar",
    label: "learn.stats.grammar",
    bg: "bg-green-500"
  },
  {
    value: "paragraph",
    label: "learn.stats.listening",
    bg: "bg-orange-500"
  },
  {
    value: "sentence",
    label: "learn.stats.pronunciation",
    bg: "bg-pink-500"
  },
  {
    value: "speaking_question",
    label: "learn.stats.question",
    bg: "bg-yellow-500"
  },
  {
    value: "free_talk_topic",
    label: "learn.stats.communication",
    bg: "bg-red-500"
  },
]; 

export const LEARN_CARDS = [
  {
    title: "common.vocab",
    description: "learn.cardDescription.vocab",
    icon: <Layers className="w-12 h-12 text-blue-400" />,
    isSuper: false,
  },
  {
    title: "common.grammar",
    description: "learn.cardDescription.grammar",
    icon: <BookOpen className="w-12 h-12 text-green-500" />,
    isSuper: false,
  },
  {
    title: "common.communication",
    description: "learn.cardDescription.communication",
    icon: <MessageSquare className="w-12 h-12 text-purple-400" />,
    isSuper: true,
  },
  {
    title: "common.listening",
    description: "learn.cardDescription.listening",
    icon: <Headphones className="w-12 h-12 text-orange-400" />,
    isSuper: false,
  },
  {
    title: "common.pronunciation",
    description: "learn.cardDescription.pronunciation",
    icon: <Volume2 className="w-12 h-12 text-pink-400" />,
    isSuper: true,
  },
  {
    title: "common.question",
    description: "learn.cardDescription.question",
    icon: <HelpCircle className="w-12 h-12 text-yellow-400" />,
    isSuper: true,
  },
];
