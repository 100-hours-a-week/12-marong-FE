import type {
  IGroupProfileResponseDto,
  IGroupResponseDto,
} from "@/api/group/type";

export type GroupDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  group?: IGroupResponseDto | IGroupProfileResponseDto;
};
