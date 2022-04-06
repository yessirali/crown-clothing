import CategoryItem from "../../components/CategoryItem/CategoryItem";
import "./directory.scss";

const Directory = ({ Categories }) => {
  return (
    <div className="categories-container">
      {Categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
