import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import "./style.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchOptionType } from "../../../components/BrowseNotes/SearchInput/SearchOptionType";
import ActionSection from "./ActionSection";
import { BrowseHistoryType } from "./types/BrowseHistoryType";
import { browseNotes, deleteNoteByReferenceList } from "./service";
import HomeView from "./HomeView";
import CategoryView from "./CategoryView";
import NoteListView from "./NoteListView";
import * as StorageService from "./StorageService";
import Header from "./Header";
import PreviewNote from "../../../components/PreviewNote";
import NewNote from "../../../components/NewNote";

interface Props {
  location: any;
  space: string;
}

const BrowsePage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [browsehistory, setBrowsehistory] = useState<BrowseHistoryType[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const metadataValueList = useSelector(
    (state: any) => state.metadataValue.items
  );
  const labelList = useSelector((state: any) => state.label.items);
  const keywordList = useSelector((state: any) => state.keyword.items);
  const [categories, setCategories] = useState<string[]>();
  const [isBrowserMode, setIsBrowserMode] = useState(false);

  const toggleIsBrowserMode = () => {
    if (!isBrowserMode) {
      if (browsehistory.length > 0) {
        let _browsehistory = cloneDeep(browsehistory);
        const item = _browsehistory[_browsehistory.length - 1];
        item.selectedNoteIds = [];
        _browsehistory[_browsehistory.length - 1] = item;
        setBrowsehistory(_browsehistory);
      }
    }

    setIsBrowserMode(!isBrowserMode);
  };

  useEffect(() => {
    setBrowsehistory(StorageService.readBrowseHistory());
  }, []);

  useEffect(() => {
    console.log(searchParams.get("view"));
  }, [searchParams]);

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
    if (isBrowserMode) {
      onPreview(selectedNoteId);
    } else if (browsehistory.length > 0) {
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
    if (!searchParams.get("view") && browsehistory.length > 0) {
      let _browsehistory = cloneDeep(browsehistory);
      _browsehistory = _browsehistory.splice(0, browsehistory.length - 1);
      setBrowsehistory(_browsehistory);
      setCategories([]);
      setNotes([]);
    } else if (searchParams.get("view")) {
      // const newParams = new URLSearchParams(searchParams.toString());
      // newParams.set("view", "");
      // setSearchParams(newParams);
      navigate(-1);
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

  // const closePopupView = () => {
  //   setPopupView("none");
  //   setPopupTitle("");
  // };

  const onPreview = (noteId?: string) => {
    if (noteId) {
      console.log("*1", noteId);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", "previewnote");
      newParams.set("reference", noteId);
      setSearchParams(newParams);
    } else if (
      browsehistory.length > 0 &&
      browsehistory[browsehistory.length - 1].selectedNoteIds.length > 0
    ) {
      console.log("*2", noteId);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("view", "previewnote");
      setSearchParams(newParams);
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
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("view", "newnote");
    setSearchParams(newParams);
  };

  return (
    <div className="page-animate">
      <div className="browse-page">
        <div className="browse-page-browser">
          <Header
            space={props.space}
            browsehistory={browsehistory}
            back={back}
            onNewNote={onNewNote}
            showInfo={!searchParams.get("view")}
            isBrowserMode={isBrowserMode}
            toggleIsBrowserMode={toggleIsBrowserMode}
          />

          {!searchParams.get("view") && (
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
          )}

          {!searchParams.get("view") &&
            browsehistory.length > 0 &&
            browsehistory[browsehistory.length - 1].view === "note" &&
            browsehistory[browsehistory.length - 1].selectedNoteIds.length >
              0 && (
              <div className="browse-page-browser__action">
                <ActionSection
                  space={props.space}
                  onPreview={() => onPreview()}
                  onFindSimilar={onFindSimilar}
                  onDelete={onDelete}
                  browseHistory={browsehistory[browsehistory.length - 1]}
                />
              </div>
            )}
          {searchParams.get("view") === "newnote" && (
            <div className="browse-page-browser__main">
              <NewNote space={props.space} location={props.location} />
            </div>
          )}
          {searchParams.get("view") === "previewnote" &&
            browsehistory.length > 0 &&
            browsehistory[browsehistory.length - 1].view === "note" &&
            browsehistory[browsehistory.length - 1].selectedNoteIds.length >
              0 && (
              <div className="browse-page-browser__main">
                <PreviewNote
                  space={props.space}
                  reference={
                    browsehistory[browsehistory.length - 1].selectedNoteIds[0]
                  }
                />
              </div>
            )}
          {searchParams.get("view") === "previewnote" &&
            searchParams.get("reference") && (
              <div className="browse-page-browser__main">
                <PreviewNote
                  space={props.space}
                  reference={searchParams.get("reference") || ""}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
