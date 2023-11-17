import { TailSpin } from 'react-loader-spinner'

export default function LoadSpinner() {
  return (
    <div className="relative w-full h-[70vh]">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TailSpin
          height="50"
          width="50"
          color="#086f86"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  )
}
