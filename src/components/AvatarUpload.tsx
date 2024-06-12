import React from "react";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const CameraIcon = styled(PhotoCamera)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  opacity: 0,
});

interface StyledIconButtonProps extends IconButtonProps {
  hoverOpacity?: number;
}

const StyledIconButton = styled((props: StyledIconButtonProps) => (
  <IconButton {...props} />
))<StyledIconButtonProps>(({ hoverOpacity }) => ({
  position: "relative",
  "&:hover .camera-icon": {
    opacity: hoverOpacity !== undefined ? hoverOpacity : 1,
  },
}));

interface AvatarUploadProps {
  image: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  profileUrl?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  image,
  onImageChange,
  profileUrl,
}) => {
  return (
    <label htmlFor="icon-button-file">
      <Input
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={onImageChange}
      />
      <StyledIconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        hoverOpacity={1} // Specify hoverOpacity here if needed
      >
        {image && <Avatar src={image} sx={{ width: 100, height: 100 }} />}
        {!image && !profileUrl && (
          <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }} />
        )}
        {!image && profileUrl && (
          <Avatar sx={{ width: 100, height: 100 }} src={profileUrl} />
        )}
        <CameraIcon className="camera-icon" />
      </StyledIconButton>
    </label>
  );
};

export default AvatarUpload;
