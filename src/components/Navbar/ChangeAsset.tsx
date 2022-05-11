import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './ChangeAsset.scss';

interface Props {
  space: string;
}

const ChangeAsset = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const history = useHistory();

  const assets = useSelector((state: any) => state.asset.assets);

  const [currentAsset, setCurrentAsset] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.space && assets) {
      setCurrentAsset(
        assets?.find((item: any) => item.assetId === Number(props.space))
      );
    } else {
      setCurrentAsset(null);
    }
  }, [props.space, assets]);

  const goToChangeAssetPage = () => {
    history.push('/');
  };

  return (
    <div className="change-asset">
      {currentAsset && <div>{currentAsset.name}</div>}
      <div>
        <button onClick={goToChangeAssetPage}>
          {currentAsset ? 'Change company' : 'Choose company'}
        </button>
      </div>
    </div>
  );
};

export default ChangeAsset;
