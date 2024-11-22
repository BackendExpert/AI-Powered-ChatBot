import React, { useState } from 'react'

const HomePage = () => {
    const [SearchData, SetSearchData] = useState("")
    const [ResultData, SetResultData] = useState([])

    const headleSearch = async() => {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const cx = process.env.REACT_APP_CUSTOM_SEARCH_ENGINE_ID;

        if (!apiKey || !cx) {
            alert("unknown Error white Searching Data....")
            return;
        }

        try {
            const response = await axios.get(
              `https://www.googleapis.com/customsearch/v1?q=${SearchData}&key=${apiKey}&cx=${cx}`
            );
            SetResultData(response.data.items || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }
  return (
    <div>HomePage</div>
  )
}

export default HomePage