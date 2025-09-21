import toast from "react-hot-toast";

export async function handleClipboard(responseText: string) {
  try {
    await navigator.clipboard.writeText(responseText);
    toast.success("Response copied");
  } catch (error) {
    toast.error("Failed to copy: " + error);
  }
}
