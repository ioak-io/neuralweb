import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "basicui";
import MainSection from "../../../components/MainSection";
import { SearchOptionType } from "src/components/BrowseNotes/SearchInput/SearchOptionType";
import MetadataDefinitionModel from "src/model/MetadataDefinitionModel";

interface Props {
  location: any;
  space: string;
}

const BrowsePageOld = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const metadataDefinitionList = useSelector(
    (state: any) => state.metadataDefinition.items
  );
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>(
    []
  );

  useEffect(() => {
    const _searchByOptions: SearchOptionType[] = [
      // {
      //   name: 'label',
      //   label: 'label'
      // }
    ];

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

  const gotoPage = (browseBy: string) => {
    navigate(`/${props.space}/browse/${browseBy}`);
  };

  return (
    <div className="page-animate">
      <Topbar title="Browse" />
      <MainSection>
        {/* <h2>Browse by group</h2> */}
        <div className="browse-page-old">
          <button
            className="browse-page-old__item"
            onClick={() => gotoPage("primaryLabel")}
          >
            <div className="browse-page-old__item__left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            </div>
            <div className="browse-page-old__item__right">
              <div className="browse-page-old__item__right__top">
                Starred label
              </div>
              <div className="browse-page-old__item__right__bottom">
                Primary starred label that uniquely categorize the content,
                making it easier to find relevant articles on specific topics
              </div>
            </div>
          </button>
          <button
            className="browse-page-old__item"
            onClick={() => gotoPage("labels")}
          >
            <div className="browse-page-old__item__left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
              </svg>
            </div>
            <div className="browse-page-old__item__right">
              <div className="browse-page-old__item__right__top">Label</div>
              <div className="browse-page-old__item__right__bottom">
                Descriptive labels that help categorize and index the content,
                making it easier to find relevant articles on specific topics
              </div>
            </div>
          </button>
          {searchByOptions.map((item) => (
            <button
              className="browse-page-old__item"
              onClick={() => gotoPage(item.name)}
            >
              <div className="browse-page-old__item__left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M418.4 157.9c35.3-8.3 61.6-40 61.6-77.9c0-44.2-35.8-80-80-80c-43.4 0-78.7 34.5-80 77.5L136.2 151.1C121.7 136.8 101.9 128 80 128c-44.2 0-80 35.8-80 80s35.8 80 80 80c12.2 0 23.8-2.7 34.1-7.6L259.7 407.8c-2.4 7.6-3.7 15.8-3.7 24.2c0 44.2 35.8 80 80 80s80-35.8 80-80c0-27.7-14-52.1-35.4-66.4l37.8-207.7zM156.3 232.2c2.2-6.9 3.5-14.2 3.7-21.7l183.8-73.5c3.6 3.5 7.4 6.7 11.6 9.5L317.6 354.1c-5.5 1.3-10.8 3.1-15.8 5.5L156.3 232.2z" />
                </svg>
              </div>
              <div className="browse-page-old__item__right">
                <div className="browse-page-old__item__right__top">
                  {item.label}
                </div>
                <div className="browse-page-old__item__right__bottom">
                  {item.name}
                </div>
              </div>
            </button>
          ))}
          <button
            className="browse-page-old__item"
            onClick={() => gotoPage("keywords")}
          >
            <div className="browse-page-old__item__left">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
              </svg>
            </div>
            <div className="browse-page-old__item__right">
              <div className="browse-page-old__item__right__top">Keyword</div>
              <div className="browse-page-old__item__right__bottom">
                Context identified by the artificial inteligence algorithm
              </div>
            </div>
          </button>
        </div>
      </MainSection>
    </div>
  );
};

export default BrowsePageOld;
