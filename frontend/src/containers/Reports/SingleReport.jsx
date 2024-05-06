import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";
import ReportCard from "@/components/ReportCard";
import ChatPage from "@/containers/ChatPage";
import PropTypes from "prop-types";

const SingleReport = ({ id }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch(`${API_URL}/report/${id}`);
      const res = await response.json();
      console.log(res);
      setContent(res.data[0]);
    };
    fetchContent();
  }, [id]);

  return (
    <div className="flex flex-col py-24 h-screen">
      <div className="flex flex-col justify-center text-5xl">
        <div className="flex px-36">
          <ReportCard
            id={content.id}
            title={content.title}
            description={content.description}
            imageUrl={content.imageUrl}
            tags={content.tags}
            className="w-1/3"
          />
          <div className="w-2/3 ml-10 grow">
            <Card className="h-1/3 overflow-y-scroll">
              <CardHeader>
                <CardTitle>Top Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-inside">
                  {(content?.trends || []).map((trend) => (
                    <li key={trend.id}>
                      <div className="flex flex-col">
                        <span className="text-sm mb-2 font-semibold">
                          {trend.title}
                        </span>
                        <span className="text-xs">{trend.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="mt-10 min-h-[52vh] max-h-[52vh] overflow-y-scroll">
              <CardHeader>
                <CardTitle>{`Chat with ${content.title}`}</CardTitle>
              </CardHeader>
              <div className="h-5/6 flex flex-row justify-center items-center px-5 overflow-y-scroll">
                <ChatPage title={content.title} namespace={content.namespace} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

SingleReport.propTypes = {
  id: PropTypes.string,
};

export default SingleReport;
