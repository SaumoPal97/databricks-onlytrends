import { useParams } from "react-router-dom";
import SingleReport from "./SingleReport";
import AllReports from "./AllReports";

const Reports = () => {
  let { reportId } = useParams();

  return (
    <div>{reportId ? <SingleReport id={reportId} /> : <AllReports />}</div>
  );
};

export default Reports;
