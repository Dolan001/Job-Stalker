import React from 'react'
import { useRouter } from 'next/router'

const Filters = () => {

    const router = useRouter()

    let queryParams;
    if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search)
    }

    function checkBoxHandleClick(checkbox) { 
        if (typeof window !== 'undefined') {
            const cb = document.getElementsByName(checkbox.name)

            cb.forEach((item) => {
                if (item !== checkbox) item.checked = false
            })
        }

        if (checkbox.checked === false) {
            if (queryParams.has(checkbox.name)) {
                queryParams.delete(checkbox.name)

                router.replace({
                    search: queryParams.toString()
                })
            }
        } else {
            if (queryParams.has(checkbox.name)) {
                queryParams.set(checkbox.name, checkbox.value)
            } else {
                queryParams.append(checkbox.name, checkbox.value)
            }

            router.replace({
                search: queryParams.toString() 
            })
        }
     }
    
    function checkBoxHandler(checkBoxType, checkBoxValue) { 
        if (typeof window !== 'undefined') {
            const value = queryParams.get(checkBoxType);
            if (checkBoxValue === value) return true;
            return false;
        }
     }

  return (
      <div className="sidebar mt-5">
          <h3>Filters</h3>

          <hr />
          <h5 className="filter-heading mb-3">Job Type</h5>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="type"
                  id="check1"
                  value="Permanent"
                  defaultChecked={checkBoxHandler('type', 'Permanent')}
                  onClick = {(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check1">
                  Permanent
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="type"
                  id="check2"
                  value="Temporary"
                  defaultChecked={checkBoxHandler('type', 'Temporary')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check2">
                  Temporary
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="type"
                  id="check3"
                  value="Internship"
                  defaultChecked={checkBoxHandler('type', 'Internship')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check3">
                  Internship
              </label>
          </div>

          <hr />
          <h5 className="mb-3">Education</h5>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="education"
                  id="check41"
                  value="Diploma"
                  defaultChecked={checkBoxHandler('education', 'Diploma')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check4">
                  Diploma
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="education"
                  id="check4"
                  value="Bachelors"
                  defaultChecked={checkBoxHandler('education', 'Bachelors')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check4">
                  Bachelors
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="education"
                  id="check5"
                  value="Masters"
                  defaultChecked={checkBoxHandler('education', 'Masters')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check5">
                  Masters
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="education"
                  id="check6"
                  value="Phd"
                  defaultChecked={checkBoxHandler('education', 'Phd')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check6">
                  Phd
              </label>
          </div>

          <hr />

          <h5 className="mb-3">Experience</h5>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="experience"
                  id="check7"
                  value="No Experience"
                  defaultChecked={checkBoxHandler('experience', 'No Experience')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check7">
                  No Experience
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="experience"
                  id="check8"
                  value="1 Years"
                  defaultChecked={checkBoxHandler('experience', '1 Years')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check8">
                  1 Years
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="experience"
                  id="check9"
                  value="2 Years"
                  defaultChecked={checkBoxHandler('experience', '2 Years')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check9">
                  2 Years
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="experience"
                  id="check10"
                  value="3 Years"
                  defaultChecked={checkBoxHandler('experience', '3 Years')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check10">
                  3 Years
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="experience"
                  id="check10"
                  value="3 Years or Above"
                  defaultChecked={checkBoxHandler('experience', '5 Years or Above')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check10">
                  5 Years +
              </label>
          </div>

          <hr />
          <h5 className="mb-3">Salary Range</h5>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="salary"
                  id="check11"
                  value="1-50000"
                  defaultChecked={checkBoxHandler('salary', '1-50000')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check11">
                  $1 - $50000
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="salary"
                  id="check12"
                  value="50000-100000"
                  defaultChecked={checkBoxHandler('salary', '50000-100000')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check12">
                  $50000 - $100,000
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="salary"
                  id="check13"
                  value="100000-200000"
                  defaultChecked={checkBoxHandler('salary', '100000-200000')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check13">
                  $100,000 - $200,000
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="salary"
                  id="defaultCheck2"
                  value="300000-500000"
                  defaultChecked={checkBoxHandler('salary', '300000-500000')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="defaultCheck2">
                  $300,000 - $500,000
              </label>
          </div>

          <div className="form-check">
              <input
                  className="form-check-input"
                  type="checkbox"
                  name="salary"
                  id="check14"
                  value="500000-1000000"
                  defaultChecked={checkBoxHandler('salary', '500000-1000000')}
                  onClick={(e) => checkBoxHandleClick(e.target)}
              />
              <label className="form-check-label" htmlFor="check14">
                  $500,000 - $1,000,000
              </label>
          </div>

          <hr />
      </div>
  )
}

export default Filters