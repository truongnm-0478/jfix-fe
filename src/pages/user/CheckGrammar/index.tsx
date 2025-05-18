import {
  Alert,
  AlertDescription
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Correction, GrammarCheckResponse } from "@/dataHelper/ai.dataHelper";
import { aiApi } from "@/services/api/aiApi";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextComparison } from "./components/TextComparison";

const GrammarChecker = () => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<GrammarCheckResponse | null>(null);
  const [checkError, setCheckError] = useState<Error | null>(null);
  const textWasChecked = useRef(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (text: string) => {
      if (!text.trim()) {
        throw new Error("No text to check");
      }
      return aiApi.checkGrammar(text);
    },
    onSuccess: (data) => {
      setResult(data);
      setCheckError(null);
      textWasChecked.current = true;
    },
    onError: (error: Error) => {
      setCheckError(error);
      setResult(null);
    },
  });

  const handleSubmit = () => {
    if (inputText.trim()) {
      mutate(inputText);
    }
  };

  const corrections: Correction[] = result?.corrections || [];
  const originalText = result?.original_text || "";
  const correctedText = result?.corrected_text || "";

  return (
    <div className="md:p-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{t("checkGrammar.title")}</CardTitle>
          <CardDescription>
            {t("checkGrammar.description")}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t("checkGrammar.placeholder")}
            className="min-h-32"
          />
          
          <Button 
            onClick={handleSubmit} 
            disabled={isPending || !inputText.trim()}
            className="w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("checkGrammar.checking")}
              </>
            ) : (
              t("checkGrammar.checkButton")
            )}
          </Button>

          {checkError && (
            <Alert variant="destructive">
              <AlertDescription>
                {checkError.message || t("checkGrammar.errorOccurred")}
              </AlertDescription>
            </Alert>
          )}

          {result && result.status === "success" && (
            <>
              <Alert>
                <AlertDescription>
                  {corrections.length > 0 
                    ? t("checkGrammar.detectedIssues", { count: corrections.length }) 
                    : t("checkGrammar.noIssuesFound")
                  }
                </AlertDescription>
              </Alert>
              <TextComparison 
                original={originalText} 
                corrections={corrections}
                corrected={correctedText}
              />
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col items-start text-sm text-gray-500 gap-2">
          {textWasChecked.current && (
            corrections.length > 0 ? (
              <>
                <p className="font-medium">{t("checkGrammar.detectedCorrections")} {corrections.length}</p>
                {corrections.map((correction, idx) => (
                  <div key={correction.id || idx} className="mt-1 p-2 border border-gray-200 rounded w-full">
                    <div className="font-medium">{t("checkGrammar.correction")} {idx + 1}:</div>
                    <div>{t("checkGrammar.error")}: "<span className="text-red-600">{originalText.substring(correction.start ?? 0, correction.end ?? 0)}</span>"</div>
                    <div>{t("checkGrammar.replacement")}: "<span className="text-green-600">{correction.replacement || "[delete]"}</span>"</div>
                  </div>
                ))}
              </>
            ) : (
              result?.status === "success" && <div>{t("checkGrammar.noGrammarIssues")}</div>
            )
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default GrammarChecker;