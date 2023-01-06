export const base64converter = (converted) => {
  const mapper = {
    "-": "+",
    _: "/",
  };
  return converted.replace(/[-_]/g, (m) => mapper[m]);
};

export const mnemonicPhrase = JSON.parse('{"d":"WEq2digJdZ8WadmrxnPHTi2ZxT25SmCsFeQlT3cCWodzzLa-oXG3hPiTz6Ui_MJYFOOjn83uZ-M9nbV503X4Jz5swdBZr4q--6RogRXBZfE7kVbJ8IKm5nv2b7hshCSFY0O5fLps1lROZ-HIhwvS3usf9rEVoa2jgT0xoKsiU_3vK6bAKR_ZQLVP6sXzHffwFlYo7UYQp6VpznkgCyAqCWlszeKi02B2N6yymwILjEQwDOLunfDV6zrZE1J_hXASAjzjzEchsySAydUjHM0DV6Yob5YbrI3lS27OgFNFOGQQvkHdm6WX4Jbak_3mzKavpsM78ZzVxTjiPv2NelouLHVSuH103dnqtVYl-0ToleycKBNPmp4ngPS74BzAt-lBQAbyEcPULxScXKhPVAMfbleQYXMPWnsGATzrcCyubEFZKGejjy5XeVenrm_O6XmG_5dGyOidY3VYTzf9FNsT-gTlT3EMqqEdeHgtLaU6sl5FkJHkbyC4rW_aIr9ytcYC3wmF4Tohm8KaUTOkAEBl3Mx-HHXxnacesyRMa-KNyqYbkRRU5FJjQ1KWcKVVtn1ZwMfcM91C9uHJszbSIHHS7i3wXPO2doYF2WcR37IsuT41FdIEraoI0KTji_3uIZ_dIjXSW6bcFNOVhxR07ACIIjuE1cyV50qSPAU3kfNeAlU","dp":"oKqP0m6kn7y3Rt0u-0h1Nwo05903LLab_80-iXdZ5SHhGaLPSlxoE6jR-p-GhosuDkfqiAByN_04BcJB0n_8dvZnSBZ4qzTGKiLDTeVNGFQd_nYKYMRrjyck-3SEYWulhNzXHXJAx4_-pjn6pGcAWS3LfqpHSXJAdZ9arqFMwwxyhRMX64X_beO3JFVnZrOo2wDe68ini8K8Ccj131bfHUbgoEYJRfeoxmT366y_25bunO-SaI-K7xIjJj-xHN1EVvUBIjveIAq9SC5qQyphlJe-LyxpzKz3aKIaFd5atQYl6pw5pO43ZCcF6asWRqBftROURAgUALJNouR3kXd1TQ","dq":"FZnSW6Iv7gYq8-qrm_fOZ2xqk_xEwpdMp-iCJY_XGPULJLRLA9qGYBINtdk1JGNnIkA8oyjk9G1bDFww48Yspzv3kBr14nQYw1VwST532d_o6-Yw-rz758SJnR8Zv4nVX8vHi7aWJpxVtM5zkc_02eLH-Jtul6KEB0r0xF3a-z-xkbbrPYptg7MDp4wwIGXsGxeiBT0w4xH3c9AJh6cNDZW2iRLotskNTD1NJSgVxAcnfywFz2GfHPB5utP0xqmRTB-4bze6gjpXdxpXbJ8VRKo0CjDRoIJsFpdk8gXXa44NRov9K0FjxMBeGqBqukn394G0EUbaGJiM5g-LSuLgOw","e":"AQAB","ext":true,"kty":"RSA","n":"n2HtfT4u7neTz3V-jUOV7tfmA7vRJsLYw1pQvEYae1AghafPmckpRsoVbHMgCJyv9_Wfvq_kD6poLwMbO2DOOAUpX0Arxi6K8WRvBv1fjQ2SB-ZpnEif_U_9fMtOiPy7XhSGWIzs9aZMMsyl02x4fCV6KegZH1L3vCR9ainrnYlZBUfqZMrXpiCRULO14Btm6qvdaoSX7UIIP9JL8e1LOmN7dSP1v1V7HF_GEFmDlns-_1nk-KChFPu1NuC4EYp6W4h6wixPhvxeOQfs4-3r2hL_Osbp-Bl0UlxYItFsKJjE1Y_leCSF0ntEJLLe4jRPJ6C9sBXTohgutReFBf-RCUSjMkiUfzzyHKxWmECOyjFDuyj-_kCoxanTMvAdCusOR4d4LwSRxM2yp5m_mpiw5Lb4ZH8K0xtN_MWMvX9Gu8sD4IU8p5Smcu8R9milVP02cwCY9yHe-ov6VTWZTITOAurMzNA2vPe-xjNYrwWnlJXrf9ONl_7muehG-AxGbA8SsMNrQZBIya7TKpBdgHZ3TRua6Q5jCajTdi33WsvhbyUZRVK5xbW-JYNe8giSmZMl7FUcXfhLlzB5GeIY2d9BiICBsMORZQJY4wEbz25unS5e7Vli8ckon9OaTRfTdUborg1u-a_SpNHxXXmr_WrZTZLQP3CcYzda8lLiqoeHMiE","p":"z1DrocH1XeN3ccNna6Y0ExHfcx9bNcT9tCOEHx5euI6IVEtoksDv6-x4yNDMOcqTPxXEtGtub8CIJSYc9KXsav25FabzYJc3wEEReSSjarC_OWPF7dQXCtm0OelG9830NUdH21p3LvhRzmLGezcDqQOfVAL5PASv40oGOEAXFixxmOcI-ZaXNdY7DZoFpU8fEndtC-c33ADOMZoprNuhi1sb7e24qzc51-2GC_BfXYhu_PTgrgsgZwzx29MTuxR64pnu4QwRhRR7CjXSvtn9ReV2HEJgW2fh3d_Q3MUkPLC1suSsJO9g5dUgg4nQNLH6FHCrP9fMWatqELl1GOy6ww","q":"xM9rAA4UAlo4YLh7hUOrjYAEkeDrtWe37_RmSeJ7z5o3OhlCT0dLlD-OZIoNy2rJ_1ZEPY3m654t-O0TLo3gqNydvPd-XBtOK9qwH9gtkU5cvbwySVB-BBKyyvXjRBGvaSOH-NDEW6BYTeB7Akvm3iQDHDOl_q_f5A-pa66wWloSfF6PurrQkBZ4UJIM540iBlNkSdtq9Szl1VhGmY5-FT0vCugKT23McLMjkiQxQsOoY34zuhSo7kwLXTMOyrvX6hzZD-ojTct1P_LZtCPMvb9267Vlg8rHRQ_kbrag_Qb4OiDN05p2ToRIkXCer6Bp-AQdAVl8pxVM7py3TfvpSw","qi":"PLuSB3A5WxFsmClrK6D4IabpH0YQLSMNaNZaeVX_jZbCtOtmN5hXY_29WAvUqIoHN8Gt8QFwlO2_iHhgBnjQZYjH9snrQXi_WH8b9pEiku4vaeNxnDCnAcY07_Bx69ru6kEKwk2-yTv5hBFt7fhI7iu13Prd3GZsuIdHDyqHITQda1iSj_FZcf6EUxbta6gtd_fSR7GQM8LMy5NQd_aQMBLsuzakhSaOu09zHZQNryun1Hfu4znuF2div7SMSOwnPsyfqIr_7Xr8IdQPQlBOMcqJIS4POS4Ifmz9Fs-j5TqjsEtay054IBEc6UYKGj-r_pgoDYcsfE5iCkq56Yjvyw"}')

export const parseTime = (origin) => {
  const splited = origin.toString().split(' ')

  const month = splited[1]
  const day = splited[2]
  const year = splited[3]

  const result = year + monthMapper[month] + day
  
  return result
}

const monthMapper = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  "Apr": '04',
  "May": '05',
  "Jun": '06',
  "Jul": '07',
  "Aug": '08',
  "Sep": '09',
  "Oct": '10',
  "Nov": '11',
  "Dec": '12'
};