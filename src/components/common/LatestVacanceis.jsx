import React from 'react';
import One from '../../assets/imgs/one.png';
import { Link } from 'react-router-dom';


const LatestVacanceis = () => {
  return (
     <section className="vacancies">
        <div className="container">
          <h2>Vacancies</h2>
          <div className="row mt-4">
            <div className="col-md-3 col-6">
              <div className="vacancy card border-0">
                <div className="card-img">
                  <Link to="/VacancyDetail">
                  <img src={One} alt="" className="w-100"/>
                  </Link>
                </div>
                <div className="card-body pt-3">
                  <Link to="/VacancyDetail">IntouchCx</Link>
                  <div className="salary">
                    $18K
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
  )
}

export default LatestVacanceis