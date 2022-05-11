import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ExpenseModel from '../../../model/ExpenseModel';
import Topbar from '../../../components/Topbar';
import DisableContextBarCommand from '../../../events/DisableContextBarCommand';

const queryString = require('query-string');

const EMPTY_EXPENSE: ExpenseModel = {
  amount: undefined,
  billDate: '',
  category: '',
  description: '',
  tagId: [],
};

const EMPTY_BILL: ReceiptModel = {
  billDate: format(new Date(), 'yyyy-MM-dd'),
  items: [{ ...EMPTY_EXPENSE }],
  number: '',
  total: 0,
  description: '',
};

interface Props {
  space: string;
  location: any;
}

const LandingPage = (props: Props) => {
  const history = useHistory();

  const authorization = useSelector((state: any) => state.authorization);
  const companyList = useSelector((state: any) => state.company.items);

  const goToCreateCompanyPage = () => {
    history.push('/company/edit');
  };

  const goToCompanyPage = (companyReference: number) => {
    history.push(`/${companyReference}/note`);
  };

  useEffect(() => {
    DisableContextBarCommand.next(true);
  }, []);

  return (
    <div className="landing-page">
      <Topbar title="Choose company" />
      <div className="landing-page__main__container">
        <div className="landing-page__main main-section">
          {companyList.map((company: any) => (
            <button
              key={company._id}
              className="landing-page__main__company"
              onClick={() => goToCompanyPage(company.reference)}
            >
              <div className="landing-page__main__company__title">
                {company.name}
              </div>
              <div className="landing-page__main__company__subtitle">
                {company.description}
              </div>
            </button>
          ))}
          <button
            className="landing-page__main__new-company"
            onClick={goToCreateCompanyPage}
          >
            <FontAwesomeIcon icon={faPlus} />
            <div>New company</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
