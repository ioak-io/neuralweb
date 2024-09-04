import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchOptionType } from "src/components/BrowseNotes/SearchInput/SearchOptionType";
import MetadataDefinitionModel from "src/model/MetadataDefinitionModel";
import HomeActionButton from "../ui/HomeActionButton";

interface Props {
  space: string;
  metadataId: string;
  categories: string[];
  initiateBrowserHistory: any;
}

const CategoryView = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const metadataDefinitionList = useSelector(
    (state: any) => state.metadataDefinition.items
  );
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>(
    []
  );

  useEffect(() => {
    const _searchByOptions: SearchOptionType[] = [];

    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      if (item.linkable) {
        _searchByOptions.push({
          name: item._id || "",
          label: `${item.group} > ${item.name}`,
        });
      }
    });

    setSearchByOptions(_searchByOptions);
  }, [metadataDefinitionList]);

  return (
    <div className="browse-page-categoryview">
      {props.categories.map((category) => (
        <div key={category}>
          <HomeActionButton
            label={category}
            onClick={() =>
              props.initiateBrowserHistory({
                view: "note",
                metadataId: props.metadataId,
                metadataValue: category,
                pageHeading: category,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryView;
