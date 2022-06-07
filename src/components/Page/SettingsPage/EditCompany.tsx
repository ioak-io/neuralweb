import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './EditCompany.scss';
import { newId } from '../../../events/MessageService';
import CompanyModel from '../../../model/CompanyModel';
import { saveCompany } from '../EditCompanyPage/service';
import Topbar from '../../../components/Topbar';
import Footer from '../../../components/Footer';

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

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const save = () => {
    saveCompany(state, authorization).then((response: any) => {
      console.log('company details updated');
    });
  };

  const goBack = () => {
    history.goBack();
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
                  <div>
                    <label>Name</label>
                    <input
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                      autoFocus
                      required
                    />
                  </div>
                  <div>
                    <label>Reference</label>
                    <input
                      name="reference"
                      value={state.reference || ''}
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label>Description</label>
                  <input
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    type="textarea"
                    required
                  />
                </div>
              </div>
            </form>
          )}
          {!company && (
            <div>Company details cannot be loaded at the moment</div>
          )}
        </div>
      </div>
      <Footer>
        <div className="footer-action">
          <button
            className="button primary-button"
            type="submit"
            onClick={save}
          >
            <FontAwesomeIcon icon={faCheck} />
            Save
          </button>
          <button className="button default-button" onClick={goBack}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </Footer>
    </div>
  );
};

export default EditCompany;
