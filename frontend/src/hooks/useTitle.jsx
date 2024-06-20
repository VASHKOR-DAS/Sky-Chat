import { useEffect } from "react";

const useTitle = title => {
    useEffect(() => {
        // document.title = (this place text show the title)
        document.title = `${title} - Sky Chat`;
    }, [title])
};

export default useTitle;