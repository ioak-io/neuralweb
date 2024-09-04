import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchOptionType } from "src/components/BrowseNotes/SearchInput/SearchOptionType";
import MetadataDefinitionModel from "src/model/MetadataDefinitionModel";
import {
  faBookmark,
  faChevronLeft,
  faFolderOpen,
  faHashtag,
  faLayerGroup,
  faStar,
  faTags,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import HomeActionButton from "../ui/HomeActionButton";

interface Props {
  space: string;
  initiateBrowserHistory: any;
}

const HomeView = (props: Props) => {
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
    <div className="browse-page-homeview">
      <HomeActionButton
        icon={faStar}
        label="Starred label"
        onClick={() =>
          props.initiateBrowserHistory({
            view: "category",
            metadataId: "primaryLabel",
            pageHeading: "Starred label",
          })
        }
      />
      <HomeActionButton
        icon={faTags}
        label="Label"
        onClick={() =>
          props.initiateBrowserHistory({
            view: "category",
            metadataId: "labels",
            pageHeading: "Label",
          })
        }
      />

      {searchByOptions.map((item) => (
        <HomeActionButton
          icon={faLayerGroup}
          label={item.label}
          onClick={() =>
            props.initiateBrowserHistory({
              view: "category",
              metadataId: item.name,
              pageHeading: item.label,
            })
          }
        />
      ))}

      <HomeActionButton
        icon={faHashtag}
        label="Keyword"
        onClick={() =>
          props.initiateBrowserHistory({
            view: "category",
            metadataId: "keywords",
            pageHeading: "Keyword",
          })
        }
      />
    </div>
  );
};

export default HomeView;
