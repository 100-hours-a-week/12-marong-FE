import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";

interface InputFieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder: string;
  onCheckDuplicate?: () => void;
  disableCheck?: boolean;
  available?: boolean | null;
}

export function InputField({
  label,
  value,
  error,
  onChange,
  maxLength,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Input
        type="text"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500 ps-2">{error}</p>}
    </div>
  );
}

export function InputFieldWithButton({
  label,
  value,
  error,
  onChange,
  maxLength,
  placeholder,
  onCheckDuplicate,
  disableCheck,
  available,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-row gap-2">
        <Input
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          className="h-full"
          disabled={disableCheck}
          onClick={onCheckDuplicate}
        >
          중복 확인
        </Button>
      </div>
      {error && <p className="text-sm text-red-500 ps-2">{error}</p>}
      {available === true && (
        <p className="text-sm text-green-500 ps-2">
          사용 가능한 {label}입니다.
        </p>
      )}
      {available === false && (
        <p className="text-sm text-red-500 ps-2">
          이미 사용 중인 {label}입니다.
        </p>
      )}
    </div>
  );
}
