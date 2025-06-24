import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

interface ImageUploaderProps {
  onChange: (file: File) => void;
}

export default function ImageUploader({ onChange }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="mx-auto rounded-full cursor-pointer size-24">
        <div className="flex overflow-hidden justify-center items-center text-gray-400 rounded-full border cursor-pointer size-full hover:border-brown-dark">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="업로드 미리보기"
              className="object-cover size-full"
            />
          ) : (
            <PlusIcon className="w-6 h-6" />
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
