'use client';

import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import Header from '@/components/Header';
import { FaPlus } from 'react-icons/fa6';
import { ITransactionFilterState } from '@/interfaces/transactions';
import handleChange from '@/utils/handleChange';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { FinancialTypeEnum } from '@/interfaces/enum/FinancialTypeEnum';

const Page = () => {
  const initialState: ITransactionFilterState = {
    name: '',
    type: 'all',
    date: '',
  };
  const [formData, setFormData] = useState<ITransactionFilterState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [maxDate, setMaxDate] = useState<string>('');

  useEffect(() => {
    setMaxDate(new Date().toISOString().slice(0, 16));
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section>
          <Container>
            <div className="w-full">
              <div className="flex flex-col gap-3 md:flex-row justify-between">
                <button
                  className="flex items-center gap-3 justify-center bg-button py-2.5 px-6 hover:bg-hover focus:outline-none shadow-md rounded transition-all duration-300">Create
                  new <FaPlus size={20} /></button>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 transition duration-300">
                  <input
                    className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
                    type="text"
                    name="name"
                    placeholder="Transaction name"
                    value={formData.name}
                    onChange={(e) => handleChange<ITransactionFilterState>(e, setFormData)} />
                  <select
                    className="p-3.5 bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
                    name="type"
                    onChange={(e) => handleChange<ITransactionFilterState>(e, setFormData)}
                  >
                    <option
                      defaultChecked>All
                    </option>
                    <option value={FinancialTypeEnum.income}>{capitalizeFirstLetter(FinancialTypeEnum.income)}</option>
                    <option
                      value={FinancialTypeEnum.expense}>{capitalizeFirstLetter(FinancialTypeEnum.expense)}</option>
                  </select>
                  <label className='relative col-span-2 md:col-span-1'>
                    <input
                      className="p-3.5 w-full md:h-full bg-input text-text focus:outline-none focus:ring-2 focus:ring-border shadow-md rounded transition-all duration-300"
                      type="datetime-local"
                      name="date"
                      min="2020-01-01T00:00"
                      max={maxDate}
                      placeholder="Date"
                      value={formData.date}
                      onChange={(e) => handleChange<ITransactionFilterState>(e, setFormData, setError)} />
                    {error && <p className="absolute text-red-500 text-xs mt-1">*{error}</p>}
                  </label>
                </div>
              </div>
              <div></div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};
export default Page;

