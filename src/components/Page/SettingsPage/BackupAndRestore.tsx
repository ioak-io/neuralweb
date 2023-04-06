import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudDownloadAlt,
  faCloudUploadAlt,
  faFileExport,
  faFileImport,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';
import { Input, Button, Checkbox } from 'basicui';
import './BackupAndRestore.scss';
import { newId } from '../../../events/MessageService';
import * as service from './service';
import RunLog from './RunLog';
import { isEmptyAttributes } from '../../../components/Utils';
import {
  fetchAndAppendExpenseItems,
  fetchAndSetExpenseItems,
} from '../../../store/actions/ExpenseActions';
import { fetchAllCategories } from '../../../store/actions/CategoryActions';
import { fetchAllIncomeCategories } from '../../../store/actions/IncomeCategoryActions';
import { fetchAllTags } from '../../../store/actions/TagActions';
import Topbar from '../../../components/Topbar';
import { fetchAndSetReceiptItems } from '../../../store/actions/ReceiptActions';
import { fetchAndSetIncomeItems } from '../../../store/actions/IncomeActions';

interface Props {
  space: string;
  location: any;
}

const BackupAndRestore = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  const expenseFilter = useSelector((state: any) => state.expense.filter);
  const expensePagination = useSelector(
    (state: any) => state.expense.pagination
  );
  const incomeFilter = useSelector((state: any) => state.income.filter);
  const incomePagination = useSelector((state: any) => state.income.pagination);
  const receiptFilter = useSelector((state: any) => state.receipt.filter);
  const receiptPagination = useSelector(
    (state: any) => state.receipt.pagination
  );
  const [queryParam, setQueryParam] = useState<any>({});
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<any>({ expenseImportFile: null });
  const [logData, setLogData] = useState<any[]>([]);

  useEffect(() => {
    if (authorization.isAuth) {
      service.getLog(props.space, authorization).then((response: any) => {
        setLogData([...response]);
      });
    }
  }, [authorization]);

  const handleFileChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.files });
  };

  const handleRunLogChange = (_data: any) => {
    setLogData(_data);
    refreshStore();
  };

  const refreshStore = () => {
    dispatch(
      fetchAndSetExpenseItems(props.space, authorization, {
        ...expenseFilter,
        pagination: {
          ...expensePagination,
          pageSize: 20,
          pageNo: 0,
          hasMore: true,
        },
      })
    );
    dispatch(
      fetchAndSetReceiptItems(props.space, authorization, {
        ...receiptFilter,
        pagination: {
          ...receiptPagination,
          pageSize: 20,
          pageNo: 0,
          hasMore: true,
        },
      })
    );
    dispatch(
      fetchAndSetIncomeItems(props.space, authorization, {
        ...incomeFilter,
        pagination: {
          ...incomePagination,
          pageSize: 20,
          pageNo: 0,
          hasMore: true,
        },
      })
    );
    dispatch(fetchAllCategories(props.space, authorization));
    dispatch(fetchAllIncomeCategories(props.space, authorization));
    dispatch(fetchAllTags(props.space, authorization));
  };

  const importExpenseFile = () => {
    if (state.expenseImportFile?.length > 0) {
      service
        .importExpenseFile(
          props.space,
          state.expenseImportFile[0],
          authorization
        )
        .then((response: any) => {
          if (!isEmptyAttributes(response?.log)) {
            setLogData([response.log, ...logData]);
          }
          refreshStore();
        });
    }
  };

  const exportExpenseFile = () => {
    service
      .exportExpenseFile(props.space, authorization)
      .then((response: any) => {
        console.log(response);
        const element = document.createElement('a');
        element.setAttribute(
          'href',
          `data:text/plain;charset=utf-8,${encodeURIComponent(response)}`
        );
        element.setAttribute(
          'download',
          `export_${company.name.toLowerCase().replaceAll(' ', '_')}_${format(
            new Date(),
            'yyyyMMdd_HHmmss'
          )}.csv`
        );

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      });
  };

  return (
    <div>
      <Topbar title="Import and export" />
      <div className="main-section">
        <div className="backup-and-restore page-width">
          <div className="content-section">
            <div className="page-title">Data export</div>
            <div>Export all expense data available in the system so far</div>
            <div className="backup-and-restore__section__action">
              <Button onClick={exportExpenseFile}>
                <FontAwesomeIcon icon={faFileExport} />
                Export
              </Button>
            </div>
          </div>
          <div className="content-section">
            <div className="page-title">Data import</div>
            <div>
              <Input
                name="expenseImportFile"
                type="file"
                value={state.file}
                onInput={handleFileChange}
              />
              {state.expenseImportFile?.length > 0 && (
                <div className="backup-and-restore__section__action">
                  <Button onClick={importExpenseFile}>
                    <FontAwesomeIcon icon={faFileImport} />
                    Import
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="content-section">
            <RunLog
              space={props.space}
              data={logData}
              handleChange={handleRunLogChange}
            />
          </div>
          <div className="content-section">
            <div className="page-title">Factory reset</div>
            <div>
              All transactions and master data definitions will be removed and
              the company file will be set back to the initial state. This
              action is not recoverable. Make sure that you have a local backup
              of the data before performing this action.
            </div>
            <div className="backup-and-restore__section__action">
              <Button onClick={() => { }}>
                <FontAwesomeIcon icon={faSkullCrossbones} />
                Delete all data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupAndRestore;
