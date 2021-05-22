function Logo({ mode }) {
  function logoMode() {
    if (mode === "dark") {
      return (
        <svg
          width="256"
          height="51"
          viewBox="0 0 256 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo"
        >
          <path
            d="M72.6834 15.0109C71.426 11.8642 69.3829 9.66151 64.9823 9.66151C60.1103 9.66151 56.1812 12.9655 56.1812 20.2029C56.1812 27.4403 60.2674 30.7443 64.9823 30.7443C69.2258 30.7443 71.426 28.5417 72.6834 25.395L77.8698 26.6536C76.4553 32.6323 71.7404 36.0937 64.9823 36.0937C57.2813 36.0937 50.3661 30.587 50.3661 20.2029C50.3661 9.81884 57.2813 4.31213 65.1395 4.31213C71.8975 4.31213 76.6125 7.77349 78.0269 13.7522L72.6834 15.0109Z"
            fill="#1A1F28"
          />
          <path
            d="M85.7279 4.31213V35.779H80.2272V4.31213H85.7279Z"
            fill="#1A1F28"
          />
          <path
            d="M98.6154 12.9656C105.845 12.9656 109.931 18.0003 109.931 24.6083C109.931 31.059 105.688 36.2511 98.6154 36.2511C91.5431 36.2511 87.2996 31.2164 87.2996 24.6083C87.1425 18.1576 91.3859 12.9656 98.6154 12.9656ZM98.6154 31.3737C102.23 31.3737 104.273 28.227 104.273 24.451C104.273 20.675 102.23 17.5283 98.6154 17.5283C95.0007 17.5283 92.9575 20.675 92.9575 24.451C92.9575 28.227 95.0007 31.3737 98.6154 31.3737Z"
            fill="#1A1F28"
          />
          <path
            d="M125.176 35.779V32.1603C123.604 34.5203 121.09 36.0937 118.261 36.0937C114.332 36.0937 111.346 33.891 111.346 29.3283V13.4375H116.846V27.7549C116.846 30.4296 118.104 31.3736 119.99 31.3736C122.662 31.3736 125.176 28.2269 125.176 22.2482V13.4375H130.677V35.779H125.176Z"
            fill="#1A1F28"
          />
          <path
            d="M147.65 35.307C146.393 35.9364 145.136 36.0937 144.036 36.0937C139.006 36.0937 135.863 33.419 135.863 27.755V18.1576H132.406V13.4375H135.863V7.77349L141.364 4.31213V13.4375H147.336V18.1576H141.364V27.9123C141.364 30.7443 142.464 31.531 144.35 31.531C145.136 31.531 145.764 31.3737 146.55 31.059L147.65 35.307Z"
            fill="#1A1F28"
          />
          <path
            d="M185.527 4.62683L177.354 35.7791H171.539L165.881 17.5283L160.224 35.7791H154.408L146.236 4.62683H152.365L157.552 27.5977L163.367 7.93086H168.239L174.054 27.5977L179.24 4.62683H185.527Z"
            fill="#1A1F28"
          />
          <path
            d="M183.641 19.259C184.427 15.6403 187.57 12.9656 192.128 12.9656C197.471 12.9656 201.558 15.1683 201.558 22.4056V35.7791H197L196.528 32.9471C194.957 34.8351 192.914 36.0938 189.613 36.0938C185.841 36.0938 182.855 33.7337 182.855 29.3284C182.855 24.923 186.784 21.9336 192.442 21.9336H196.214V20.9896C196.214 18.4723 194.328 17.6856 192.285 17.6856C190.713 17.6856 189.142 18.1576 188.356 20.203L183.641 19.259ZM190.871 31.3737C193.385 31.3737 196.057 29.643 196.057 26.811V26.339H192.442C190.085 26.339 188.67 27.283 188.67 29.171C188.513 30.2724 189.299 31.3737 190.871 31.3737Z"
            fill="#1A1F28"
          />
          <path
            d="M209.887 4.31213V35.779H204.387V4.31213H209.887Z"
            fill="#1A1F28"
          />
          <path
            d="M218.06 4.31213V35.779H212.559V4.31213H218.06Z"
            fill="#1A1F28"
          />
          <path
            d="M240.849 26.339H225.447C225.604 28.8563 227.333 31.3737 230.79 31.3737C233.305 31.3737 234.876 30.2724 236.134 27.9123L240.534 29.4857C238.806 33.4191 235.819 36.0937 230.319 36.0937C222.618 36.0937 219.632 29.8004 219.632 24.451C219.632 19.1016 222.775 12.8082 230.319 12.8082C237.863 12.8082 240.692 18.9443 240.692 23.8216V26.339H240.849ZM225.604 22.091H235.191C234.719 19.8883 233.305 17.8429 230.319 17.8429C227.647 17.6856 225.918 19.8883 225.604 22.091Z"
            fill="#1A1F28"
          />
          <path
            d="M255.622 35.307C254.365 35.9364 253.107 36.0937 252.007 36.0937C246.978 36.0937 243.835 33.419 243.835 27.755V18.1576H240.377V13.4375H243.835V7.77349L249.336 4.31213V13.4375H255.308V18.1576H249.336V27.9123C249.336 30.7443 250.436 31.531 252.322 31.531C253.107 31.531 253.736 31.3737 254.522 31.059L255.622 35.307Z"
            fill="#1A1F28"
          />
          <path
            d="M22.5632 48.6699L2.84797 28.0155C1.70399 26.817 1.74817 24.9181 2.94665 23.7741L14.3698 12.8704C15.5683 11.7264 17.4672 11.7706 18.6112 12.969L38.3265 33.6235C39.4704 34.8219 39.4263 36.7209 38.2278 37.8649L26.8046 48.7686C25.6062 49.9126 23.7072 49.8684 22.5632 48.6699Z"
            fill="#1A1F28"
          />
          <path
            d="M22.5868 43.1305L2.87153 22.4761C1.72755 21.2776 1.77173 19.3786 2.97021 18.2347L14.3934 7.33094C15.5918 6.18696 17.4908 6.23113 18.6348 7.42961L38.35 28.084C39.494 29.2825 39.4498 31.1815 38.2513 32.3254L26.8282 43.2292C25.6297 44.3731 23.7308 44.329 22.5868 43.1305Z"
            fill="white"
          />
          <path
            d="M23.13 37.8709L3.41475 17.2164C2.27076 16.0179 2.31494 14.119 3.51342 12.975L14.9366 2.07129C16.135 0.927312 18.034 0.971487 19.178 2.16996L38.8932 22.8244C40.0372 24.0229 39.993 25.9218 38.7945 27.0658L27.3714 37.9695C26.1729 39.1135 24.274 39.0693 23.13 37.8709Z"
            fill="#1A1F28"
          />
        </svg>
      );
    } else if (mode === "blue") {
      return (
        <svg
          width="154"
          className="logo"
          height="32"
          viewBox="0 0 154 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.3399 9.91957C42.5821 8.02299 41.3507 6.69538 38.6983 6.69538C35.7618 6.69538 33.3937 8.68679 33.3937 13.0489C33.3937 17.4111 35.8565 19.4025 38.6983 19.4025C41.2559 19.4025 42.5821 18.0749 43.3399 16.1783L46.4659 16.9369C45.6134 20.5404 42.7716 22.6267 38.6983 22.6267C34.0568 22.6267 29.8888 19.3077 29.8888 13.0489C29.8888 6.79021 34.0567 3.47119 38.7931 3.47119C42.8663 3.47119 45.7081 5.55743 46.5606 9.16094L43.3399 9.91957Z"
            fill="#2A64FA"
          />
          <path
            d="M51.2021 3.47119V22.437H47.8867V3.47119H51.2021Z"
            fill="#2A64FA"
          />
          <path
            d="M58.9697 8.68652C63.3271 8.68652 65.79 11.7211 65.79 15.7039C65.79 19.5919 63.2324 22.7212 58.9697 22.7212C54.707 22.7212 52.1494 19.6867 52.1494 15.7039C52.0547 11.8159 54.6123 8.68652 58.9697 8.68652ZM58.9697 19.7815C61.1484 19.7815 62.3798 17.8849 62.3798 15.6091C62.3798 13.3332 61.1484 11.4366 58.9697 11.4366C56.791 11.4366 55.5595 13.3332 55.5595 15.6091C55.5595 17.8849 56.791 19.7815 58.9697 19.7815Z"
            fill="#2A64FA"
          />
          <path
            d="M74.9785 22.4369V20.2559C74.0312 21.6783 72.5156 22.6266 70.8105 22.6266C68.4424 22.6266 66.6426 21.299 66.6426 18.5489V8.97119H69.958V17.6006C69.958 19.2127 70.7158 19.7817 71.8525 19.7817C73.4629 19.7817 74.9785 17.8851 74.9785 14.2816V8.97119H78.2939V22.4369H74.9785Z"
            fill="#2A64FA"
          />
          <path
            d="M88.5243 22.1525C87.7665 22.5318 87.0086 22.6267 86.3456 22.6267C83.3143 22.6267 81.4198 21.0146 81.4198 17.6007V11.8162H79.3358V8.97128H81.4198V5.55743L84.7352 3.47119V8.97128H88.3348V11.8162H84.7352V17.6956C84.7352 19.4025 85.3983 19.8766 86.535 19.8766C87.0086 19.8766 87.3876 19.7818 87.8612 19.5921L88.5243 22.1525Z"
            fill="#2A64FA"
          />
          <path
            d="M111.353 3.66064L106.428 22.4368H102.923L99.5125 11.4366L96.1024 22.4368H92.5975L87.6718 3.66064H91.3661L94.492 17.5057L97.9969 5.65206H100.933L104.438 17.5057L107.564 3.66064H111.353Z"
            fill="#2A64FA"
          />
          <path
            d="M110.217 12.4797C110.69 10.2986 112.585 8.68652 115.332 8.68652C118.553 8.68652 121.015 10.0141 121.015 14.3763V22.4367H118.268L117.984 20.7298C117.037 21.8678 115.806 22.6264 113.816 22.6264C111.543 22.6264 109.743 21.204 109.743 18.5488C109.743 15.8935 112.111 14.0918 115.521 14.0918H117.795V13.5228C117.795 12.0055 116.658 11.5314 115.427 11.5314C114.479 11.5314 113.532 11.8159 113.058 13.0487L110.217 12.4797ZM114.574 19.7815C116.09 19.7815 117.7 18.7384 117.7 17.0315V16.747H115.521C114.1 16.747 113.248 17.316 113.248 18.4539C113.153 19.1177 113.627 19.7815 114.574 19.7815Z"
            fill="#2A64FA"
          />
          <path
            d="M126.036 3.47119V22.437H122.721V3.47119H126.036Z"
            fill="#2A64FA"
          />
          <path
            d="M130.962 3.47119V22.437H127.646V3.47119H130.962Z"
            fill="#2A64FA"
          />
          <path
            d="M144.697 16.7476H135.414C135.509 18.2649 136.551 19.7821 138.635 19.7821C140.15 19.7821 141.098 19.1183 141.855 17.6959L144.508 18.6442C143.466 21.0149 141.666 22.627 138.35 22.627C133.709 22.627 131.909 18.8338 131.909 15.6096C131.909 12.3855 133.804 8.59229 138.35 8.59229C142.897 8.59229 144.602 12.2906 144.602 15.2303V16.7476H144.697ZM135.509 14.1872H141.287C141.003 12.8596 140.15 11.6268 138.35 11.6268C136.74 11.532 135.698 12.8596 135.509 14.1872Z"
            fill="#2A64FA"
          />
          <path
            d="M153.601 22.1525C152.843 22.5318 152.086 22.6267 151.423 22.6267C148.391 22.6267 146.497 21.0146 146.497 17.6007V11.8162H144.413V8.97128H146.497V5.55743L149.812 3.47119V8.97128H153.412V11.8162H149.812V17.6956C149.812 19.4025 150.475 19.8766 151.612 19.8766C152.086 19.8766 152.465 19.7818 152.938 19.5921L153.601 22.1525Z"
            fill="#2A64FA"
          />
          <path
            d="M12.3084 29.3449L2.07136 18.6202C0.927381 17.4218 0.971557 15.5228 2.17003 14.3788L7.33082 9.45271C8.5293 8.30873 10.4282 8.35291 11.5722 9.55139L21.8092 20.2761C22.9532 21.4746 22.9091 23.3735 21.7106 24.5175L16.5498 29.4436C15.3513 30.5876 13.4524 30.5434 12.3084 29.3449Z"
            fill="#2A64FA"
          />
          <path
            d="M12.3225 26.006L2.08552 15.2814C0.941541 14.0829 0.985717 12.1839 2.1842 11.04L7.34498 6.11385C8.54346 4.96986 10.4424 5.01404 11.5864 6.21252L21.8234 16.9372C22.9674 18.1357 22.9232 20.0346 21.7247 21.1786L16.564 26.1047C15.3655 27.2487 13.4665 27.2045 12.3225 26.006Z"
            fill="white"
          />
          <path
            d="M12.6499 22.8361L2.41292 12.1114C1.26893 10.913 1.31311 9.01403 2.51159 7.87004L7.67237 2.94392C8.87085 1.79994 10.7698 1.84412 11.9138 3.0426L22.1508 13.7673C23.2948 14.9658 23.2506 16.8647 22.0521 18.0087L16.8913 22.9348C15.6929 24.0788 13.7939 24.0346 12.6499 22.8361Z"
            fill="#2A64FA"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="logo"
          width="202"
          height="41"
          viewBox="0 0 202 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.7562 11.8483C55.7638 9.36466 54.1511 7.62608 50.6777 7.62608C46.8322 7.62608 43.731 10.234 43.731 15.9464C43.731 21.6589 46.9562 24.2668 50.6777 24.2668C54.0271 24.2668 55.7638 22.5282 56.7562 20.0445L60.8498 21.038C59.7334 25.757 56.0119 28.4891 50.6777 28.4891C44.5993 28.4891 39.1411 24.1426 39.1411 15.9464C39.1411 7.75026 44.5993 3.40381 50.8018 3.40381C56.1359 3.40381 59.8574 6.13587 60.9739 10.8549L56.7562 11.8483Z"
            fill="white"
          />
          <path
            d="M67.0524 3.40332V28.2402H62.7107V3.40332H67.0524Z"
            fill="white"
          />
          <path
            d="M77.2245 10.2334C82.9308 10.2334 86.1561 14.2073 86.1561 19.423C86.1561 24.5146 82.8067 28.6127 77.2245 28.6127C71.6422 28.6127 68.2929 24.6388 68.2929 19.423C68.1688 14.3315 71.5182 10.2334 77.2245 10.2334ZM77.2245 24.763C80.0776 24.763 81.6903 22.2793 81.6903 19.2989C81.6903 16.3184 80.0776 13.8347 77.2245 13.8347C74.3713 13.8347 72.7587 16.3184 72.7587 19.2989C72.7587 22.2793 74.3713 24.763 77.2245 24.763Z"
            fill="white"
          />
          <path
            d="M98.1891 28.2401V25.3839C96.9486 27.2467 94.9638 28.4885 92.7309 28.4885C89.6297 28.4885 87.2727 26.7499 87.2727 23.1486V10.606H91.6144V21.9067C91.6144 24.0179 92.6068 24.763 94.0954 24.763C96.2043 24.763 98.1891 22.2793 98.1891 17.5603V10.606H102.531V28.2401H98.1891Z"
            fill="white"
          />
          <path
            d="M115.928 27.8677C114.935 28.3644 113.943 28.4886 113.075 28.4886C109.105 28.4886 106.624 26.3774 106.624 21.9068V14.3316H103.895V10.606H106.624V6.13538L110.966 3.40332V10.606H115.68V14.3316H110.966V22.031C110.966 24.2663 111.834 24.8872 113.323 24.8872C113.943 24.8872 114.439 24.763 115.06 24.5147L115.928 27.8677Z"
            fill="white"
          />
          <path
            d="M145.824 3.65186L139.373 28.2404H134.784L130.318 13.835L125.852 28.2404H121.262L114.812 3.65186H119.649L123.743 21.7828L128.333 6.25973H132.178L136.768 21.7828L140.862 3.65186H145.824Z"
            fill="white"
          />
          <path
            d="M144.335 15.2008C144.956 12.3445 147.437 10.2334 151.034 10.2334C155.252 10.2334 158.477 11.972 158.477 17.6845V28.2401H154.88L154.507 26.0048C153.267 27.495 151.654 28.4885 149.049 28.4885C146.072 28.4885 143.715 26.6257 143.715 23.1486C143.715 19.6714 146.816 17.3119 151.282 17.3119H154.259V16.5668C154.259 14.5799 152.771 13.9589 151.158 13.9589C149.918 13.9589 148.677 14.3315 148.057 15.9459L144.335 15.2008ZM150.042 24.763C152.026 24.763 154.135 23.397 154.135 21.1616V20.7891H151.282C149.421 20.7891 148.305 21.5342 148.305 23.0244C148.181 23.8937 148.801 24.763 150.042 24.763Z"
            fill="white"
          />
          <path
            d="M165.052 3.40332V28.2402H160.71V3.40332H165.052Z"
            fill="white"
          />
          <path
            d="M171.502 3.40332V28.2402H167.16V3.40332H171.502Z"
            fill="white"
          />
          <path
            d="M189.49 20.7892H177.333C177.457 22.7762 178.821 24.7631 181.55 24.7631C183.535 24.7631 184.776 23.8938 185.768 22.0311L189.242 23.2729C187.877 26.3775 185.52 28.4887 181.178 28.4887C175.1 28.4887 172.743 23.5213 172.743 19.299C172.743 15.0768 175.224 10.1094 181.178 10.1094C187.133 10.1094 189.366 14.9526 189.366 18.8023V20.7892H189.49ZM177.457 17.4363H185.024C184.652 15.6977 183.535 14.0833 181.178 14.0833C179.069 13.9591 177.705 15.6977 177.457 17.4363Z"
            fill="white"
          />
          <path
            d="M201.15 27.8677C200.158 28.3644 199.165 28.4886 198.297 28.4886C194.328 28.4886 191.847 26.3774 191.847 21.9068V14.3316H189.117V10.606H191.847V6.13538L196.188 3.40332V10.606H200.902V14.3316H196.188V22.031C196.188 24.2663 197.057 24.8872 198.545 24.8872C199.165 24.8872 199.662 24.763 200.282 24.5147L201.15 27.8677Z"
            fill="white"
          />
          <path
            d="M16.7598 37.9576L2.07136 22.5695C0.927381 21.371 0.971557 19.472 2.17004 18.3281L10.2719 10.5946C11.4704 9.4506 13.3693 9.49477 14.5133 10.6933L29.2017 26.0814C30.3457 27.2799 30.3015 29.1788 29.1031 30.3228L21.0012 38.0563C19.8027 39.2002 17.9038 39.1561 16.7598 37.9576Z"
            fill="white"
          />
          <path
            d="M16.7783 33.5855L2.08992 18.1974C0.945936 16.9989 0.990112 15.1 2.18859 13.956L10.2905 6.22251C11.4889 5.07853 13.3879 5.1227 14.5319 6.32118L29.2203 21.7093C30.3643 22.9078 30.3201 24.8067 29.1216 25.9507L21.0197 33.6842C19.8213 34.8282 17.9223 34.784 16.7783 33.5855Z"
            fill="#2A64FA"
          />
          <path
            d="M17.2073 29.4341L2.51887 14.046C1.37489 12.8475 1.41907 10.9486 2.61754 9.80461L10.7194 2.07114C11.9179 0.92716 13.8168 0.971337 14.9608 2.16982L29.6492 17.5579C30.7932 18.7564 30.749 20.6554 29.5506 21.7993L21.4487 29.5328C20.2502 30.6768 18.3513 30.6326 17.2073 29.4341Z"
            fill="white"
          />
        </svg>
      );
    }
  }

  return logoMode();
}

export default Logo;
