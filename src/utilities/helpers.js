import imageFile from 'assets/file-image.svg';
import excelFile from 'assets/file-excel.svg';
import pdfFile from 'assets/file-pdf.svg';
import docFile from 'assets/file-doc.svg';
import pptFile from 'assets/file-ppt.png';
import generalFile from 'assets/file-simple.svg';

export const isPdfDocFile = (type = '') => {
  if (type?.includes('pdf') || type?.includes('text')) {
    return true;
  }

  return false;
};

export const isWordExcelFile = (type = '') => {
  if (type?.includes('doc') || type?.includes('docx') || type?.includes('xlsx')) {
    return true;
  }

  return false;
};

export const isImageFile = (type = '') => {
  if (type?.includes('image')) {
    return true;
  }

  return false;
};

export const isPptFile = (type = '') => {
  if (type?.includes('ppt') || type?.includes('pptx')) {
    return true;
  }

  return false;
};

export const isValidDocOrImage = (type = '') => {
  const isValidPdfDoc = isPdfDocFile(type);

  const isValidWordExcel = isWordExcelFile(type);

  const isValidPpt = isPptFile(type);

  const isValidImage = isImageFile(type);

  return isValidPdfDoc || isValidWordExcel || isValidPpt || isValidImage;
};

export const tets = '';

export const isMyMessage = (messageEmail, userEmail) => messageEmail === userEmail;

export const getIconByExtension = (name = '') => {
  if (name.endsWith('.xls') || name.endsWith('.xlsx')) return excelFile;
  if (name.endsWith('.pdf')) return pdfFile;
  if (name.endsWith('.csv')) return excelFile;
  if (name.endsWith('.doc') || name.endsWith('.docx')) return docFile;
  if (name.endsWith('.ppt') || name.endsWith('.pptx')) return pptFile;

  if (
    name.endsWith('.svg') ||
    name.endsWith('.png') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.webp')
  ) {
    return imageFile;
  }

  return generalFile;
};

export const getFilenameFromUrl = (url = '') => {
  const urlParts = url?.split('/');

  return urlParts.pop();
};

export const getSearchParamsObj = searchParams => Object.fromEntries(searchParams);
