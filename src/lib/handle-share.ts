import {toast} from "react-toastify";

type TData = {
  title: string;
  description?: string;
};

const handleShare = (e: any, data: TData, url: string) => {
  e?.stopPropagation();
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;
  if(navigator?.canShare?.() && navigator?.share) {
    navigator.share({
      title: data?.title,
      text: data?.description,
      url: link,
    });
  } else {
    navigator.clipboard.writeText(link)
      .then(() => toast.success('Link copied to clipboard'));
  }
};

export default handleShare;