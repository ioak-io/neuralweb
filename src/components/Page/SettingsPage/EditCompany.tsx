import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './EditCompany.scss';
import { newId } from '../../../events/MessageService';
import CompanyModel from '../../../model/CompanyModel';
import { saveCompany } from '../EditCompanyPage/service';
import Topbar from '../../../components/Topbar';

const queryString = require('query-string');

interface Props {
  space: string;
  location: any;
}

const EMPTY_COMPANY: CompanyModel = {
  _id: undefined,
  name: '',
  description: '',
  reference: null,
  numberFormat: 'en-US',
  currency: 'USD',
};

const EditCompany = (props: Props) => {
  const history = useHistory();
  const authorization = useSelector((state: any) => state.authorization);
  const company = useSelector((state: any) =>
    state.company.items.find(
      (item: any) => item.reference === parseInt(props.space, 10)
    )
  );
  const [queryParam, setQueryParam] = useState<any>({});
  const [formId, setFormId] = useState(newId());
  const [state, setState] = useState<CompanyModel>({ ...EMPTY_COMPANY });

  useEffect(() => {
    if (company) {
      setState({ ...company });
    }
  }, [company]);

  const handleChange = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const save = () => {
    saveCompany(state, authorization).then((response: any) => {
      console.log('company details updated');
    });
  };

  return (
    <div>
      <Topbar title="Company details" />
      <div className="main-section">
        <div className="edit-company page-width content-section">
          {company && (
            <form onSubmit={save}>
              <div className="form">
                <div className="form-two-column">
                  <input
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    autoFocus
                    required
                  />
                  <input
                    name="reference"
                    value={state.reference || ''}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <input
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  type="textarea"
                  required
                />
                <input
                  name="currency"
                  value={state.currency}
                  onChange={handleChange}
                  required
                />
                <input
                  name="numberFormat"
                  value={state.numberFormat}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          )}
          {!company && (
            <div>Company details cannot be loaded at the moment</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
