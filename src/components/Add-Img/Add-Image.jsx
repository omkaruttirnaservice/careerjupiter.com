import React, { useRef, useState } from "react";
import { BounceLoader } from "react-spinners";

const AddImage = () => {
    const [isCompressing, setIsCompressing] = useState(false);
    const [fileSizesKB, setFileSizesKB] = useState([]);
    const [uploadedPreviews, setUploadedPreviews] = useState([]);
    const formDataRef = useRef(new FormData());
    const compressedBlobsRef = useRef([]);

    const calculateSize = (img, maxWidth, maxHeight) => {
        let ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        return [img.width * ratio, img.height * ratio];
    };

    const compressImages = async (files) => {
        setIsCompressing(true);
        const compressedBlobs = [];
        const sizeList = [];
        formDataRef.current = new FormData(); // Reset previous FormData

        const compressOne = (file, index) =>
            new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;
                    img.onload = function () {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        const maxWidth = 800;
                        const maxHeight = 1000;

                        const [newWidth, newHeight] = calculateSize(img, maxWidth, maxHeight);
                        canvas.width = newWidth;
                        canvas.height = newHeight;
                        ctx.drawImage(img, 0, 0, newWidth, newHeight);

                        canvas.toBlob(
                            (blob) => {
                                const sizeKB = (blob.size / 1024).toFixed(2);
                                sizeList.push(sizeKB);
                                compressedBlobs.push(blob);
                                formDataRef.current.append(`userImage_${index}`, blob);
                                resolve();
                            },
                            "image/jpeg",
                            0.9
                        );
                    };
                };
                reader.readAsDataURL(file);
            });

        await Promise.all(files.map((file, idx) => compressOne(file, idx)));

        compressedBlobsRef.current = compressedBlobs;
        const previewUrls = compressedBlobs.map((blob) => URL.createObjectURL(blob));
        setUploadedPreviews(previewUrls);
        setFileSizesKB(sizeList);
        setIsCompressing(false);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedPreviews([]);
        setFileSizesKB([]);
        compressImages(files);
    };

    return (
        <div className="flex justify-center items-center mt-5 bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Image Upload & Compression
                </h2>
                <div className="flex flex-col items-center gap-4">
                    <label className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer transition">
                        Select Images
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {isCompressing && (
                        <div className="">
                          
                            <BounceLoader color="green" />
                        </div>
                    )}

                    {!isCompressing && uploadedPreviews.length > 0 && (
                        <div className="w-full mt-4">
                            <h4 className="text-md font-semibold text-gray-700 mb-2">
                                Compressed Image{uploadedPreviews.length > 1 ? "s" : ""} Preview:
                            </h4>
                            {uploadedPreviews.length === 1 ? (
                                <div className="w-full">
                                    <img
                                        src={uploadedPreviews[0]}
                                        alt="Single Preview"
                                        className="w-full max-h-[400px] object-contain rounded border border-gray-300"
                                    />
                                    <p className="text-sm text-gray-600 mt-1 text-center">
                                        {fileSizesKB[0]} KB
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {uploadedPreviews.map((url, idx) => (
                                        <div key={idx}>
                                            <img
                                                src={url}
                                                alt={`Preview ${idx}`}
                                                className="w-full max-h-[200px] object-contain rounded border border-gray-300"
                                            />
                                            <p className="text-sm text-gray-600 mt-1 text-center">
                                                {fileSizesKB[idx]} KB
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddImage;
