import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Topbar from "../../../components/Topbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "basicui";
import MainSection from "../../../components/MainSection";
import { SearchOptionType } from "src/components/BrowseNotes/SearchInput/SearchOptionType";
import MetadataDefinitionModel from "src/model/MetadataDefinitionModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faFolderOpen,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import BrowsePageOld from "../BrowsePageOld";
import ActionSection from "./ActionSection";

interface Props {
  location: any;
  space: string;
}

const BrowsePage = (props: Props) => {
  const navigate = useNavigate();
  const [isBrowserExpanded, setIsBrowserExpanded] = useState(false);
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
      {/* <Topbar title="Browse new">
          <div className="topbar-actions">
            <button
              className="button"
              onClick={() => {
                setIsBrowserExpanded(!isBrowserExpanded);
              }}
            >
              {isBrowserExpanded && <FontAwesomeIcon icon={faTimes} />}
              {!isBrowserExpanded && <FontAwesomeIcon icon={faFolderOpen} />}
              <span className="menu-highlight-line" />
            </button>
          </div>
        </Topbar> */}

      <div className="browse-page">
        <div className="browse-page-browser">
          <div className="browse-page-browser__header">
            <button className="button">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div>Book - Author name</div>
          </div>

          <div className="browse-page-browser__main">
            So if you will allow me to join your party I will also go to the
            Emerald City and ask Oz to help me. Many crows and other birds flew
            into the cornfield but as soon as they saw me they flew away again
            thinking I was a Munchkin and this pleased me and made me feel that
            I was quite an important person. I shall take the heart returned the
            Tin Woodman for brains do not make one happy and happiness is the
            best thing in the world. The country here is rich and pleasant but
            you must pass through rough and dangerous places before you reach
            the end of your journey. But once I had brains and a heart also so
            having tried them both I should much rather have a heart. They
            turned and walked through the forest a few steps when Dorothy
            discovered something shining in a ray of sunshine that fell between
            the trees. Blue is the color of the Munchkins and white is the witch
            color. But once I had brains and a heart also so having tried them
            both I should much rather have a heart. Come along said the
            Scarecrow heartily and Dorothy added that she would be pleased to
            have his company. I might have stood there always if you had not
            come along he said so you have certainly saved my life. Get an
            oilcan and oil my joints he answered. Certainly that is why I know
            it returned the Scarecrow. I’ll tell you a secret he continued as he
            walked along. My dress is blue and white checked said Dorothy
            smoothing out the wrinkles in it. Oh I see said the Tin Woodman.
            Toto ran over to the trees and began to bark at the birds sitting
            there. Thereupon the Wicked Witch enchanted my axe and when I was
            chopping away at my best one day for I was anxious to get the new
            house and my wife as soon as possible the axe slipped all at once
            and cut off my left leg. How do you do I’m not feeling well said the
            Scarecrow with a smile for it is very tedious being perched up here
            night and day to scare away crows. What can I do for you she
            inquired softly for she was moved by the sad voice in which the man
            spoke. He smelled around the stuffed man as if he suspected there
            might be a nest of rats in the straw and he often growled in an
            unfriendly way at the Scarecrow. It was a lonely life to lead for I
            had nothing to think of having been made such a little while before.
            Come along said the Scarecrow heartily and Dorothy added that she
            would be pleased to have his company. Well said the girl let us go.
            His head and arms and legs were jointed upon his body but he stood
            perfectly motionless as if he could not stir at all. ’ ‘Why he is a
            man’ said the other and I quite agreed with him. This worried
            Dorothy a little but she knew that only the Great Oz could help her
            get to Kansas again so she bravely resolved not to turn back. So she
            oiled it and as it was quite badly rusted the Scarecrow took hold of
            the tin head and moved it gently from side to side until it worked
            freely and then the man could turn it himself. Do you think he asked
            if I go to the Emerald City with you that Oz would give me some
            brains I cannot tell she returned but you may come with me if you
            like. She bade her friends goodbye and again started along the road
            of yellow brick. Can’t you get down asked Dorothy.
          </div>

          <div className="browse-page-browser__action">
            <ActionSection space={props.space} />
          </div>
          <div className="browse-page-browser__footer">12 notes selected</div>
        </div>
        <div className="browse-page-main">
          <MainSection>Main</MainSection>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
