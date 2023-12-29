import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { fetchAndSetReceiptItems } from '../../../store/actions/ReceiptActions';
import Topbar from '../../../components/Topbar';
import ReceiptFilterModel from '../../../model/ReceiptFilterModel';
import DuplicateReceipt from './DuplicateReceipt';
import DuplicateLineItem from './DuplicateLineItem';

interface Props {
  history: any;
  space: string;
}

const EMPTY_FILTER: ReceiptFilterModel = {
  name: '',
  showInDashboard: false,
  showInSummary: false,
  from: '',
  to: '',
  description: '',
  moreThan: null,
  lessThan: null,
  days: null,
  months: null,
  monthNumber: null,
  yearNumber: null,
  categoryIdList: [],
  tagIdList: [],
};

const DuplicatePage = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);
  const dispatch = useDispatch();
  const receiptFilterState: any = useSelector(
    (state: any) => state.receipt.filter
  );

  const [filterExpanded, setFilterExpanded] = useState(false);

  const toggleFilter = () => {
    setFilterExpanded(!filterExpanded);
  };

  const applyFilter = (searchCriteria: any) => {
    // setSearchCriteria(searchCriteria);
    // ReceiptFilterState.next(searchCriteria);
    dispatch(
      fetchAndSetReceiptItems(props.space, authorization, {
        ...searchCriteria,
      })
    );
  };

  const saveFilter = (_state: any) => {
    // AddFilterReceiptCommand.next({ open: true, payload: { ..._state } });
  };

  const manageFilter = () => {
    // ManageFilterReceiptCommand.next(true);
  };

  return (
    <div className="duplicate-page page-animate">
      <Topbar title="Duplicate transactions" />
      <div className="duplicate-page__main main-section page-width">
        <div>
          <DuplicateReceipt space={props.space} />
        </div>
        <div>
          <DuplicateLineItem space={props.space} />
        </div>
      </div>
    </div>
  );
};

export default DuplicatePage;
