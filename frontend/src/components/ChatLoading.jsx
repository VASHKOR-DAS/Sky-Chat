import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack sx={{ padding: "0 1em" }} spacing={1}>
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
      <Skeleton variant="rounded" height={50} />
    </Stack>
  );
};

export default ChatLoading;
