import { ROUTERS } from "@/constant";
import lottie, { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function CompleteCard({ loop = true, autoplay = true, title, description }: { loop?: boolean, autoplay?: boolean, title: string, description: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      animationRef.current = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop,
        autoplay,
        path: "/images/cat.json",
      });
    }

    return () => {
      animationRef.current?.destroy();
    };
  }, [loop, autoplay]);

  return (
    <Card className="w-full relative">
      <CardContent className="flex flex-col gap-8">
        <div ref={containerRef} className="w-full h-[500px]"></div>
        <div className="absolute bottom-9 left-0 right-0 text-center px-4">
          <h6 className="text-xl font-bold text-primary">{title}</h6>
          <p className="text-md italic font-light text-gray-500">{description}</p>
          <Button className="mt-4" onClick={() => navigate(ROUTERS.LEARN)}>{t("common.continue")}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
