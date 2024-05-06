import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ReportCard = ({ id, title, description, imageUrl, tags, className }) => {
  const tagsString = (tags || []).length > 0 ? `#${tags.join(" #")}` : "";
  return (
    <Card className={`mx-2 ${className}`}>
      <Link to={`/reports/${id}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={imageUrl} />
        </CardContent>
        <CardFooter>
          <span className="mx-1 text-blue-600 truncate text-sm">
            {tagsString}
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
};

ReportCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default ReportCard;
