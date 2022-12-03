import React from 'react'
import './loading.css'

function Loading({loading}) {
  return (
    <>
      {
        loading &&
          <div className="limiter">
            <div className="loader-wrap">
              <div className="loader">
                <div className="circle-1 circle">
                  <div className="circle-2 circle">
                    <div className="circle-3 circle">
                      <div className="circle-4 circle">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default Loading