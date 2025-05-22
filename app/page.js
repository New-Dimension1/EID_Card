"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [name, setName] = useState("");
  const [checkCard, setCheckCard] = useState(false);
  const [cardType, setCardType] = useState("1"); // Default to image 1
  const canvasRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // جلب البيانات من API عند تحميل الصفحة
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://services.mi.org.sa/api/InvitationCard"
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setData(data.data[data.data.length - 1]); // حفظ آخر عنصر فقط
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Data", Data); // سيطبع آخر عنصر فقط
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
      image.src =
        cardType === "2" ? "/images/eid_not_2.jpg" : "/images/eid_not_1.jpg";
    } else {
      image.src =
        cardType === "2" ? "/images/eid_2.jpg" : "/images/eid_1.jpg";
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

      setTimeout(() => {
        ctx.fillText(name || " ", textX, textY);

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
      style={{
        backgroundImage: `url(/images/MacBook.svg)`,
        backgroundPosition: "top left",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      <motion.div
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-11/12 "
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex justify-center mb-4">
          <img src="/images/hlogo.png" alt="Logo" className="h-14 w-auto" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#003366] mb-2.5 text-center">
          {Data.mainTopic}
        </h1>
        <p className="text-[#52677c] text-center mb-2.5 max-w-xl mx-auto leading-7 text-sm">
          {Data.subtopic}
        </p>

        <form onSubmit={handleDownload} className="space-y-5">
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <input
              type="text"
              id="Name"
              name="Name"
              className={`w-full p-3 pt-5 border rounded-xl border-gray-300 text-start !text-[#003366] peer outline-none text-sm mt-0.5`}
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
                isFocused || name
                  ? "top-1 text-xs !text-[#6D8440]"
                  : "top-4 text-base"
              }`}
            >
              الاسم
            </label>
          </motion.div>

          <motion.div
            className="flex items-center "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.input
              className="mx-2"
              type="checkbox"
              name="CheckCard"
              id="CheckCard"
              checked={checkCard}
              onChange={(e) => setCheckCard(e.target.checked)}
              animate={{ scale: checkCard ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <label htmlFor="CheckCard" className="text-[#003366] text-sm ">
              البطاقة غير الرسمية
            </label>
          </motion.div>
          <hr className="w-full my-4 h-[0.12rem]  bg-gradient-to-r from-white via-[#6D8440]/60 to-white border-0" />

          <h3 className="text-[#003366] text-right my-4">اختر بطاقة</h3>
          <motion.div
            className="flex justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {["1", "2"].map((type) => (
              <motion.label
                key={type}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer rounded-xl border-4 transition-all duration-500 w-32 sm:w-40 md:w-52 lg:w-64 overflow-hidden shadow-md ${
                  cardType === type
                    ? "border-[#6D8440] shadow-xl"
                    : "border-gray-300"
                }`}
                onClick={() => setCardType(type)}
              >
                <img
                  className="w-full h-full object-cover"
                  src={`/images/eid_${type}.jpg`}
                  alt={`Card ${type}`}
                />
              </motion.label>
            ))}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-[#003366]/90 text-sm sm:text-base transition-all duration-500"
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
