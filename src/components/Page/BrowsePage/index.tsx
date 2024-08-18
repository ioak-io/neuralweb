import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import "./style.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainSection from "../../../components/MainSection";
import { SearchOptionType } from "../../../components/BrowseNotes/SearchInput/SearchOptionType";
import ActionSection from "./ActionSection";
import { BrowseHistoryType } from "./BrowseHistoryType";
import { browseNotes, deleteNoteByReferenceList } from "./service";
import HomeView from "./HomeView";
import CategoryView from "./CategoryView";
import NoteListView from "./NoteListView";
import * as StorageService from "./StorageService";
import Header from "./Header";
import Popup from "./Popup";
import PreviewNote from "../../../components/PreviewNote";
import NewNote from "../../../components/NewNote";

interface Props {
  location: any;
  space: string;
}

const BrowsePage = (props: Props) => {
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [searchByOptions, setSearchByOptions] = useState<SearchOptionType[]>(
    []
  );
  const [browsehistory, setBrowsehistory] = useState<BrowseHistoryType[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const metadataValueList = useSelector(
    (state: any) => state.metadataValue.items
  );
  const labelList = useSelector((state: any) => state.label.items);
  const keywordList = useSelector((state: any) => state.keyword.items);
  const [categories, setCategories] = useState<string[]>();
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [popupView, setPopupView] = useState<"none" | "merge" | "newnote">(
    "none"
  );

  useEffect(() => {
    setBrowsehistory(StorageService.readBrowseHistory());
  }, []);

  const findCategories = (metadataId: string): string[] => {
    let _categories: string[] = [];
    if (metadataId === "labels" || metadataId === "primaryLabel") {
      _categories = labelList;
    } else if (metadataId === "keywords" && keywordList) {
      _categories = keywordList;
    } else if (
      metadataId &&
      !["labels", "primaryLabel", "keywords"].includes(metadataId) &&
      metadataValueList
    ) {
      _categories = metadataValueList[metadataId];
    } else {
      _categories = [];
    }
    return _categories?.sort((a, b) => a.localeCompare(b)) || [];
  };

  const initiateBrowserHistory = (event: BrowseHistoryType) => {
    const _browsehistory: BrowseHistoryType[] = [
      ...browsehistory,
      { ...event, selectedNoteIds: [] },
    ];
    setBrowsehistory(_browsehistory);
  };

  const onSelectNote = (selectedNoteId: string) => {
    if (browsehistory.length > 0) {
      let _browsehistory = cloneDeep(browsehistory);
      const item = _browsehistory[_browsehistory.length - 1];
      if (item.selectedNoteIds?.includes(selectedNoteId)) {
        item.selectedNoteIds = item.selectedNoteIds.filter(
          (_item) => _item !== selectedNoteId
        );
      } else {
        item.selectedNoteIds?.push(selectedNoteId);
      }
      _browsehistory[_browsehistory.length - 1] = item;
      setBrowsehistory(_browsehistory);
    }
  };

  const back = () => {
    if (browsehistory.length > 0) {
      let _browsehistory = cloneDeep(browsehistory);
      _browsehistory = _browsehistory.splice(0, browsehistory.length - 1);
      setBrowsehistory(_browsehistory);
      setCategories([]);
      setNotes([]);
    }
  };

  useEffect(() => {
    if (browsehistory.length > 0 && authorization.isAuth) {
      const item = browsehistory[browsehistory.length - 1];
      if (item.view === "note") {
        browseNotes(props.space, item, authorization).then((response) => {
          setNotes(response);
        });
      }
    }
    StorageService.writeBrowseHistory(browsehistory);
  }, [browsehistory, authorization]);

  useEffect(() => {
    if (browsehistory.length > 0 && authorization.isAuth) {
      const item = browsehistory[browsehistory.length - 1];
      if (item.view === "category" && item.metadataId) {
        setCategories(findCategories(item.metadataId));
      }
    }
    StorageService.writeBrowseHistory(browsehistory);
  }, [browsehistory, authorization, labelList, keywordList, metadataValueList]);

  const closePopupView = () => {
    setPopupView("none");
    setPopupTitle("");
  };

  const onPreview = () => {
    if (
      browsehistory.length > 0 &&
      browsehistory[browsehistory.length - 1].selectedNoteIds.length > 0
    ) {
      navigate(
        `/${props.space}/note/${
          browsehistory[browsehistory.length - 1].selectedNoteIds[0]
        }`
      );
    }
  };

  const onDelete = () => {
    if (
      browsehistory.length > 0 &&
      browsehistory[browsehistory.length - 1].selectedNoteIds.length > 0
    ) {
      deleteNoteByReferenceList(
        props.space,
        browsehistory[browsehistory.length - 1].selectedNoteIds,
        authorization
      ).then((response) => {
        if (browsehistory.length > 0) {
          let _browsehistory = cloneDeep(browsehistory);
          const item = _browsehistory[_browsehistory.length - 1];
          item.selectedNoteIds = [];
          setBrowsehistory(_browsehistory);
        }
      });
    }
  };

  const onFindSimilar = () => {
    if (browsehistory.length > 0) {
      const newItem: BrowseHistoryType = {
        ...cloneDeep(browsehistory[browsehistory.length - 1]),
        metadataId: "related",
        metadataValue: browsehistory[browsehistory.length - 1].selectedNoteIds,
        pageHeading: `Related to ${
          browsehistory[browsehistory.length - 1].selectedNoteIds.length
        } other notes`,
      };

      const _browsehistory: BrowseHistoryType[] = [...browsehistory, newItem];
      setBrowsehistory(_browsehistory);
    }
  };

  const onNewNote = () => {
    setPopupView("newnote");
    setPopupTitle("New note");
  };

  return (
    <div className="page-animate">
      <div className="browse-page">
        {popupView === "none" && (
          <div className="browse-page-browser">
            <Header
              space={props.space}
              browsehistory={browsehistory}
              back={back}
              onNewNote={onNewNote}
            />

            <div className="browse-page-browser__main">
              {(browsehistory.length === 0 ||
                browsehistory[browsehistory.length - 1].view === "home") && (
                <HomeView
                  space={props.space}
                  initiateBrowserHistory={initiateBrowserHistory}
                />
              )}
              {browsehistory.length > 0 &&
                browsehistory[browsehistory.length - 1].view === "category" && (
                  <CategoryView
                    space={props.space}
                    metadataId={
                      browsehistory[browsehistory.length - 1].metadataId || ""
                    }
                    categories={categories || []}
                    initiateBrowserHistory={initiateBrowserHistory}
                  />
                )}
              {browsehistory.length > 0 &&
                browsehistory[browsehistory.length - 1].view === "note" && (
                  <NoteListView
                    space={props.space}
                    notes={notes}
                    browseHistory={browsehistory[browsehistory.length - 1]}
                    onSelectNote={onSelectNote}
                  />
                )}
            </div>

            {browsehistory.length > 0 &&
              browsehistory[browsehistory.length - 1].view === "note" &&
              browsehistory[browsehistory.length - 1].selectedNoteIds.length >
                0 && (
                <div className="browse-page-browser__action">
                  <ActionSection
                    space={props.space}
                    onPreview={onPreview}
                    onFindSimilar={onFindSimilar}
                    onDelete={onDelete}
                    browseHistory={browsehistory[browsehistory.length - 1]}
                  />
                </div>
              )}
          </div>
        )}
        {popupView === "newnote" && (
          <div className="browse-page-main">
            <NewNote space={props.space} location={props.location} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
