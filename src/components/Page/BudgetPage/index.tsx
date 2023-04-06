import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'basicui';
import Topbar from '../../../components/Topbar';
import './style.scss';
import { newId } from '../../../events/MessageService';
import { getBudgetByYear, saveBudget } from './service';
import BudgetItems from './BudgetItems';
import BudgetModel from '../../../model/BudgetModel';

interface Props {
  space: string;
}

const THIS_YEAR = new Date().getFullYear();
const NEXT_YEAR = new Date().getFullYear() + 1;
const LAST_YEAR = new Date().getFullYear() - 1;

const BudgetPage = (props: Props) => {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const categories = useSelector((state: any) => state.category.categories);
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<BudgetModel[]>([]);
  const [year, setYear] = useState(THIS_YEAR);

  useEffect(() => {
    if (authorization.isAuth) {
      getBudgetByYear(props.space, year, authorization).then(
        (response: any) => {
          if (response) {
            setState(response);
          }
        }
      );
    }
  }, [year, authorization]);

  const handleChange = (_state: BudgetModel[]) => {
    setState(_state);
  };
  const reduceYear = () => {
    setYear(year - 1);
  };
  const addYear = () => {
    setYear(year + 1);
  };

  const save = () => {
    setSaving(true);
    saveBudget(props.space, year, state, authorization).then(
      (response: any) => {
        setState(response);
        setSaving(false);
      }
    );
  };

  const getYearRange = () => {
    const _res = [];
    let i = 2000;
    while (i < 2100) {
      _res.push(i);
      i += 1;
    }
    return _res;
  };

  const goBack = () => {
    navigate(-1)
  };

  return (
    <div className="budget-page page-animate">
      <Topbar title="Budget">right</Topbar>
      <div className="budget-page__main main-section content-section">
        <div className="budget-page__main__year">
          <button onClick={reduceYear} className="button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div>{year}</div>
          <button onClick={addYear} className="button">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="budget-page__main__table">
          <BudgetItems
            data={state}
            formId={formId}
            year={year}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="footer">
        <div />
        <div className="footer-right">
          <Button onClick={save} loading={saving}>
            <FontAwesomeIcon icon={faCheck} />
            Save
          </Button>
          <Button onClick={goBack}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
