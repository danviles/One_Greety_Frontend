import React from 'react'

const AlertaComponent = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'} 
    bg-gradient-to-br text-center text-white font-bold text-sm p-3 my-5 rounded-xl`}>
      {alerta.msg}
    </div>
  )
}

export default AlertaComponent