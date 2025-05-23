"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [checkCard, setCheckCard] = useState(false);
  const [cardType, setCardType] = useState("1");
  const canvasRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPositionFocused, setIsPositionFocused] = useState(false);
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://services.mi.org.sa/api/InvitationCard");
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setData(data.data[data.data.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDownload = (e) => {
    e.preventDefault();
    if (!cardType) {
      alert("يرجى اختيار نوع البطاقة");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.crossOrigin = "anonymous";

    if (checkCard) {
      image.src = cardType === "2" ? "/images/eid_not_2.jpg" : "/images/eid_not_1.jpg";
    } else {
      image.src = cardType === "2" ? "/images/eid_2.jpg" : "/images/eid_1.jpg";
    }

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.font = "100px 'Alexandria', sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";

      const textX = canvas.width / Data.dx;
      const textY = canvas.height - 500;
      const positionY = textY + 120;

      setTimeout(() => {
        ctx.fillText(name || " ", textX, textY);
        if (position) {
          ctx.font = "70px 'Alexandria', sans-serif";
          ctx.fillText(position, textX, positionY);
        }
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "eid_greeting.png";
        link.click();
      }, 100);
    };
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(/images/bg.svg)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      <motion.div
        className="bg-white my-10 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full  max-w-sm md:max-w-2xl lg:max-w-4xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Logo" className="h-20 sm:h-24 w-auto" />
        </div>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-[#005482] mb-4 text-center leading-normal">
          يتقدم رئيس وأعضاء مجلس الإدارة والأمين العام لاتحاد الغرف التجارية السعودية وجميع منسوبيها بتهنئتكم بحلول عيد الأضحى المبارك
        </h1>

        <p className="text-[#52677c] text-center mb-4 max-w-2xl mx-auto leading-7 text-sm sm:text-base">
          نسأل الله أن يعيده علينا وعليكم باليمن والبركات، وكل عام وأنتم بخير.
        </p>

        <form onSubmit={handleDownload} className="space-y-5">
          {/* الاسم */}
          <motion.div className="relative w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <input
              type="text"
              id="Name"
              name="Name"
              className="w-full p-2 pt-5 border rounded-xl border-gray-300 text-start !text-[#006EAB] peer outline-none text-sm sm:text-base"
              placeholder=" "
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(name !== "")}
            />
            <label
              htmlFor="Name"
              className={`absolute right-3 text-gray-500 transition-all duration-500 ${
                isFocused || name ? "top-1 text-xs !text-[#249770]" : "top-4 text-base"
              }`}
            >
              الاسم
            </label>
          </motion.div>

          {/* المنصب */}
          <motion.div className="relative w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <input
              type="text"
              id="Position"
              name="Position"
              className="w-full p-2 pt-5 border rounded-xl border-gray-300 text-start !text-[#006EAB] peer outline-none text-sm sm:text-base"
              placeholder=" "
              maxLength={50}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              onFocus={() => setIsPositionFocused(true)}
              onBlur={() => setIsPositionFocused(position !== "")}
            />
            <label
              htmlFor="Position"
              className={`absolute right-3 text-gray-500 transition-all duration-500 ${
                isPositionFocused || position ? "top-1 text-xs !text-[#249770]" : "top-4 text-base"
              }`}
            >
              المنصب
            </label>
          </motion.div>

          {/* اختيار بطاقة */}
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <input
              className="accent-[#249770] cursor-pointer"
              type="checkbox"
              name="CheckCard"
              id="CheckCard"
              checked={checkCard}
              onChange={(e) => setCheckCard(e.target.checked)}
            />
            <label htmlFor="CheckCard" className="text-[#006EAB] text-sm sm:text-base">البطاقة غير الرسمية</label>
          </motion.div>

          <hr className="w-full my-4 h-[2px] bg-gradient-to-r from-white via-[#249770]/60 to-white border-0" />

          <h3 className="text-[#006EAB] text-right text-base sm:text-lg font-bold">اختر بطاقة</h3>
          <motion.div className="flex flex-wrap justify-center gap-4 sm:gap-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            {["1", "2"].map((type) => (
              <motion.label
                key={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer rounded-xl border-4 transition-all duration-500 w-32 sm:w-40 md:w-52 lg:w-64 overflow-hidden shadow  ${
                  cardType === type ? "border-[#249770] shadow-2xl" : "border-gray-300"
                }`}
                onClick={() => setCardType(type)}
              >
                <img className="w-full h-full object-cover" src={`/images/eid_${type}.jpg`} alt={`Card ${type}`} />
              </motion.label>
            ))}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-[#006EAB] text-white py-3 rounded-lg hover:bg-[#006EAB]/90 text-sm sm:text-base transition-all duration-500"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            تحميل البطاقة
          </motion.button>
        </form>

        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </motion.div>
    </motion.div>
  );
}
