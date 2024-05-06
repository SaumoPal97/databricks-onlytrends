import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";
import ReportCard from "@/components/ReportCard";

const Home = () => {
  const tags = ["finance", "technology", "crypto", "ai"];
  const [taggedContent, setTaggedContent] = useState({});

  useEffect(() => {
    const fetchTaggedContent = async () => {
      for (let tag of tags) {
        const response = await fetch(`${API_URL}/report?tags=${tag}`);
        const res = await response.json();
        setTaggedContent((prevState) => {
          return { ...prevState, [tag]: res.data };
        });
      }
    };
    fetchTaggedContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col pt-24">
      <div className="flex flex-col justify-center items-center text-5xl">
        <span className="mb-2 font-bold">The search engine for</span>
        <span className="mb-2 font-bold text-blue-700">the latest trends</span>
      </div>
      <div className="flex flex-row justify-center items-center mt-8 mb-16">
        <Link to="/reports" className="mx-2">
          <Button size="sm" variant="outline">
            See All Reports
          </Button>
        </Link>
        <Link to="/chat" className="mx-2">
          <Button size="sm">Chat with AI</Button>
        </Link>
      </div>
      {tags.map((tag) => {
        return (
          <div key={tag} className="flex flex-col p-8">
            <span className="text-xl font-semibold">
              Top reports in <span className="text-blue-600">{`#${tag}`}</span>
            </span>
            <div className="flex flex-row mt-8 overflow-x-scroll">
              {(taggedContent[tag] || []).map((content) => (
                <ReportCard
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  description={content.description}
                  imageUrl={content.imageUrl}
                  tags={content.tags}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
