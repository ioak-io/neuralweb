import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Input} from 'basicui';

import './BudgetItems.scss';
import BudgetModel from '../../../model/BudgetModel';

interface Props {
  data: BudgetModel[];
  year: number;
  handleChange: any;
  formId: string;
}

const BudgetItems = (props: Props) => {
  const categories = useSelector((state: any) => state.category.categories);
  const [budgetMap, setBudgetMap] = useState<any>({});

  useEffect(() => {
    const _budgetMap: any = {};

    props.data.forEach((item) => {
      _budgetMap[`${item.month}-${item.categoryId}`] = item;
    });

    setBudgetMap(_budgetMap);
  }, [props.data]);

  const handleChange = (event: any, record: any, monthNumber: number) => {
    const _data = [...props.data];
    const index = _data.findIndex(
      (item) => item.categoryId === record._id && item.month === monthNumber
    );
    if (index > -1) {
      _data[index] = { ..._data[index], amount: event.currentTarget.value };
    } else {
      _data.push({
        year: props.year,
        month: monthNumber,
        amount: event.currentTarget.value,
        categoryId: record._id,
      });
    }
    props.handleChange(_data);
  };

  return (
    <div className="budget-items">
      <div className="budget-items__main">
        <table className="basicui-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>January</th>
              <th>February</th>
              <th>March</th>
              <th>April</th>
              <th>May</th>
              <th>June</th>
              <th>July</th>
              <th>August</th>
              <th>September</th>
              <th>October</th>
              <th>November</th>
              <th>December</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((record: any) => (
              <tr key={record._id}>
                <td>{record.name}</td>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((monthNumber) => (
                  <td>
                    <Input
                      name="amount"
                      type="number"
                      value={budgetMap[`${monthNumber}-${record._id}`]?.amount}
                     onInput={(event: any) =>
                        handleChange(event, record, monthNumber)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetItems;
