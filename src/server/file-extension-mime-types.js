'use strict';

var list = {
	'_323': 'text/h323',
	'_3g2': 'video/3gpp2',
	'_3gp': 'video/3gpp',
	'_3gp2': 'video/3gpp2',
	'_3gpp': 'video/3gpp',
	'_7z': 'application/x-7z-compressed',
	'_aa': 'audio/audible',
	'_AAC': 'audio/aac',
	'_aaf': 'application/octet-stream',
	'_aax': 'audio/vnd.audible.aax',
	'_ac3': 'audio/ac3',
	'_aca': 'application/octet-stream',
	'_accda': 'application/msaccess.addin',
	'_accdb': 'application/msaccess',
	'_accdc': 'application/msaccess.cab',
	'_accde': 'application/msaccess',
	'_accdr': 'application/msaccess.runtime',
	'_accdt': 'application/msaccess',
	'_accdw': 'application/msaccess.webapplication',
	'_accft': 'application/msaccess.ftemplate',
	'_acx': 'application/internet-property-stream',
	'_AddIn': 'text/xml',
	'_ade': 'application/msaccess',
	'_adobebridge': 'application/x-bridge-url',
	'_adp': 'application/msaccess',
	'_ADT': 'audio/vnd.dlna.adts',
	'_ADTS': 'audio/aac',
	'_afm': 'application/octet-stream',
	'_ai': 'application/postscript',
	'_aif': 'audio/x-aiff',
	'_aifc': 'audio/aiff',
	'_aiff': 'audio/aiff',
	'_air': 'application/vnd.adobe.air-application-installer-package+zip',
	'_amc': 'application/x-mpeg',
	'_application': 'application/x-ms-application',
	'_art': 'image/x-jg',
	'_asa': 'application/xml',
	'_asax': 'application/xml',
	'_ascx': 'application/xml',
	'_asd': 'application/octet-stream',
	'_asf': 'video/x-ms-asf',
	'_ashx': 'application/xml',
	'_asi': 'application/octet-stream',
	'_asm': 'text/plain',
	'_asmx': 'application/xml',
	'_aspx': 'application/xml',
	'_asr': 'video/x-ms-asf',
	'_asx': 'video/x-ms-asf',
	'_atom': 'application/atom+xml',
	'_au': 'audio/basic',
	'_avi': 'video/x-msvideo',
	'_axs': 'application/olescript',
	'_bas': 'text/plain',
	'_bcpio': 'application/x-bcpio',
	'_bin': 'application/octet-stream',
	'_bmp': 'image/bmp',
	'_c': 'text/plain',
	'_cab': 'application/octet-stream',
	'_caf': 'audio/x-caf',
	'_calx': 'application/vnd.ms-office.calx',
	'_cat': 'application/vnd.ms-pki.seccat',
	'_cc': 'text/plain',
	'_cd': 'text/plain',
	'_cdda': 'audio/aiff',
	'_cdf': 'application/x-cdf',
	'_cer': 'application/x-x509-ca-cert',
	'_chm': 'application/octet-stream',
	'_class': 'application/x-java-applet',
	'_clp': 'application/x-msclip',
	'_cmx': 'image/x-cmx',
	'_cnf': 'text/plain',
	'_cod': 'image/cis-cod',
	'_config': 'application/xml',
	'_contact': 'text/x-ms-contact',
	'_coverage': 'application/xml',
	'_cpio': 'application/x-cpio',
	'_cpp': 'text/plain',
	'_crd': 'application/x-mscardfile',
	'_crl': 'application/pkix-crl',
	'_crt': 'application/x-x509-ca-cert',
	'_cs': 'text/plain',
	'_csdproj': 'text/plain',
	'_csh': 'application/x-csh',
	'_csproj': 'text/plain',
	'_css': 'text/css',
	'_csv': 'text/csv',
	'_cur': 'application/octet-stream',
	'_cxx': 'text/plain',
	'_dat': 'application/octet-stream',
	'_datasource': 'application/xml',
	'_dbproj': 'text/plain',
	'_dcr': 'application/x-director',
	'_def': 'text/plain',
	'_deploy': 'application/octet-stream',
	'_der': 'application/x-x509-ca-cert',
	'_dgml': 'application/xml',
	'_dib': 'image/bmp',
	'_dif': 'video/x-dv',
	'_dir': 'application/x-director',
	'_disco': 'text/xml',
	'_dll': 'application/x-msdownload',
	'_dll.config': 'text/xml',
	'_dlm': 'text/dlm',
	'_doc': 'application/msword',
	'_docm': 'application/vnd.ms-word.document.macroEnabled.12',
	'_docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'_dot': 'application/msword',
	'_dotm': 'application/vnd.ms-word.template.macroEnabled.12',
	'_dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
	'_dsp': 'application/octet-stream',
	'_dsw': 'text/plain',
	'_dtd': 'text/xml',
	'_dtsConfig': 'text/xml',
	'_dv': 'video/x-dv',
	'_dvi': 'application/x-dvi',
	'_dwf': 'drawing/x-dwf',
	'_dwp': 'application/octet-stream',
	'_dxr': 'application/x-director',
	'_eml': 'message/rfc822',
	'_emz': 'application/octet-stream',
	'_eot': 'application/octet-stream',
	'_eps': 'application/postscript',
	'_etl': 'application/etl',
	'_etx': 'text/x-setext',
	'_evy': 'application/envoy',
	'_exe': 'application/octet-stream',
	'_exe.config': 'text/xml',
	'_fdf': 'application/vnd.fdf',
	'_fif': 'application/fractals',
	'_filters': 'Application/xml',
	'_fla': 'application/octet-stream',
	'_flr': 'x-world/x-vrml',
	'_flv': 'video/x-flv',
	'_fsscript': 'application/fsharp-script',
	'_fsx': 'application/fsharp-script',
	'_generictest': 'application/xml',
	'_gif': 'image/gif',
	'_group': 'text/x-ms-group',
	'_gsm': 'audio/x-gsm',
	'_gtar': 'application/x-gtar',
	'_gz': 'application/x-gzip',
	'_h': 'text/plain',
	'_hdf': 'application/x-hdf',
	'_hdml': 'text/x-hdml',
	'_hhc': 'application/x-oleobject',
	'_hhk': 'application/octet-stream',
	'_hhp': 'application/octet-stream',
	'_hlp': 'application/winhlp',
	'_hpp': 'text/plain',
	'_hqx': 'application/mac-binhex40',
	'_hta': 'application/hta',
	'_htc': 'text/x-component',
	'_htm': 'text/html',
	'_html': 'text/html',
	'_htt': 'text/webviewhtml',
	'_hxa': 'application/xml',
	'_hxc': 'application/xml',
	'_hxd': 'application/octet-stream',
	'_hxe': 'application/xml',
	'_hxf': 'application/xml',
	'_hxh': 'application/octet-stream',
	'_hxi': 'application/octet-stream',
	'_hxk': 'application/xml',
	'_hxq': 'application/octet-stream',
	'_hxr': 'application/octet-stream',
	'_hxs': 'application/octet-stream',
	'_hxt': 'text/html',
	'_hxv': 'application/xml',
	'_hxw': 'application/octet-stream',
	'_hxx': 'text/plain',
	'_i': 'text/plain',
	'_ico': 'image/x-icon',
	'_ics': 'application/octet-stream',
	'_idl': 'text/plain',
	'_ief': 'image/ief',
	'_iii': 'application/x-iphone',
	'_inc': 'text/plain',
	'_inf': 'application/octet-stream',
	'_inl': 'text/plain',
	'_ins': 'application/x-internet-signup',
	'_ipa': 'application/x-itunes-ipa',
	'_ipg': 'application/x-itunes-ipg',
	'_ipproj': 'text/plain',
	'_ipsw': 'application/x-itunes-ipsw',
	'_iqy': 'text/x-ms-iqy',
	'_isp': 'application/x-internet-signup',
	'_ite': 'application/x-itunes-ite',
	'_itlp': 'application/x-itunes-itlp',
	'_itms': 'application/x-itunes-itms',
	'_itpc': 'application/x-itunes-itpc',
	'_IVF': 'video/x-ivf',
	'_jar': 'application/java-archive',
	'_java': 'application/octet-stream',
	'_jck': 'application/liquidmotion',
	'_jcz': 'application/liquidmotion',
	'_jfif': 'image/pjpeg',
	'_jnlp': 'application/x-java-jnlp-file',
	'_jpb': 'application/octet-stream',
	'_jpe': 'image/jpeg',
	'_jpeg': 'image/jpeg',
	'_jpg': 'image/jpeg',
	'_js': 'application/x-javascript',
	'_json': 'application/json',
	'_jsx': 'text/jscript',
	'_jsxbin': 'text/plain',
	'_latex': 'application/x-latex',
	'_library-ms': 'application/windows-library+xml',
	'_lit': 'application/x-ms-reader',
	'_loadtest': 'application/xml',
	'_lpk': 'application/octet-stream',
	'_lsf': 'video/x-la-asf',
	'_lst': 'text/plain',
	'_lsx': 'video/x-la-asf',
	'_lzh': 'application/octet-stream',
	'_m13': 'application/x-msmediaview',
	'_m14': 'application/x-msmediaview',
	'_m1v': 'video/mpeg',
	'_m2t': 'video/vnd.dlna.mpeg-tts',
	'_m2ts': 'video/vnd.dlna.mpeg-tts',
	'_m2v': 'video/mpeg',
	'_m3u': 'audio/x-mpegurl',
	'_m3u8': 'audio/x-mpegurl',
	'_m4a': 'audio/m4a',
	'_m4b': 'audio/m4b',
	'_m4p': 'audio/m4p',
	'_m4r': 'audio/x-m4r',
	'_m4v': 'video/x-m4v',
	'_mac': 'image/x-macpaint',
	'_mak': 'text/plain',
	'_man': 'application/x-troff-man',
	'_manifest': 'application/x-ms-manifest',
	'_map': 'text/plain',
	'_master': 'application/xml',
	'_md': 'text/markdown',
	'_mda': 'application/msaccess',
	'_mdb': 'application/x-msaccess',
	'_mde': 'application/msaccess',
	'_mdp': 'application/octet-stream',
	'_me': 'application/x-troff-me',
	'_mfp': 'application/x-shockwave-flash',
	'_mht': 'message/rfc822',
	'_mhtml': 'message/rfc822',
	'_mid': 'audio/mid',
	'_midi': 'audio/mid',
	'_mix': 'application/octet-stream',
	'_mk': 'text/plain',
	'_mmf': 'application/x-smaf',
	'_mno': 'text/xml',
	'_mny': 'application/x-msmoney',
	'_mod': 'video/mpeg',
	'_mov': 'video/quicktime',
	'_movie': 'video/x-sgi-movie',
	'_mp2': 'video/mpeg',
	'_mp2v': 'video/mpeg',
	'_mp3': 'audio/mpeg',
	'_mp4': 'video/mp4',
	'_mp4v': 'video/mp4',
	'_mpa': 'video/mpeg',
	'_mpe': 'video/mpeg',
	'_mpeg': 'video/mpeg',
	'_mpf': 'application/vnd.ms-mediapackage',
	'_mpg': 'video/mpeg',
	'_mpp': 'application/vnd.ms-project',
	'_mpv2': 'video/mpeg',
	'_mqv': 'video/quicktime',
	'_ms': 'application/x-troff-ms',
	'_msi': 'application/octet-stream',
	'_mso': 'application/octet-stream',
	'_mts': 'video/vnd.dlna.mpeg-tts',
	'_mtx': 'application/xml',
	'_mvb': 'application/x-msmediaview',
	'_mvc': 'application/x-miva-compiled',
	'_mxp': 'application/x-mmxp',
	'_nc': 'application/x-netcdf',
	'_nsc': 'video/x-ms-asf',
	'_nws': 'message/rfc822',
	'_ocx': 'application/octet-stream',
	'_oda': 'application/oda',
	'_odc': 'text/x-ms-odc',
	'_odh': 'text/plain',
	'_odl': 'text/plain',
	'_odp': 'application/vnd.oasis.opendocument.presentation',
	'_ods': 'application/oleobject',
	'_odt': 'application/vnd.oasis.opendocument.text',
	'_one': 'application/onenote',
	'_onea': 'application/onenote',
	'_onepkg': 'application/onenote',
	'_onetmp': 'application/onenote',
	'_onetoc': 'application/onenote',
	'_onetoc2': 'application/onenote',
	'_orderedtest': 'application/xml',
	'_osdx': 'application/opensearchdescription+xml',
	'_p10': 'application/pkcs10',
	'_p12': 'application/x-pkcs12',
	'_p7b': 'application/x-pkcs7-certificates',
	'_p7c': 'application/pkcs7-mime',
	'_p7m': 'application/pkcs7-mime',
	'_p7r': 'application/x-pkcs7-certreqresp',
	'_p7s': 'application/pkcs7-signature',
	'_pbm': 'image/x-portable-bitmap',
	'_pcast': 'application/x-podcast',
	'_pct': 'image/pict',
	'_pcx': 'application/octet-stream',
	'_pcz': 'application/octet-stream',
	'_pdf': 'application/pdf',
	'_pfb': 'application/octet-stream',
	'_pfm': 'application/octet-stream',
	'_pfx': 'application/x-pkcs12',
	'_pgm': 'image/x-portable-graymap',
	'_pic': 'image/pict',
	'_pict': 'image/pict',
	'_pkgdef': 'text/plain',
	'_pkgundef': 'text/plain',
	'_pko': 'application/vnd.ms-pki.pko',
	'_pls': 'audio/scpls',
	'_pma': 'application/x-perfmon',
	'_pmc': 'application/x-perfmon',
	'_pml': 'application/x-perfmon',
	'_pmr': 'application/x-perfmon',
	'_pmw': 'application/x-perfmon',
	'_png': 'image/png',
	'_pnm': 'image/x-portable-anymap',
	'_pnt': 'image/x-macpaint',
	'_pntg': 'image/x-macpaint',
	'_pnz': 'image/png',
	'_pot': 'application/vnd.ms-powerpoint',
	'_potm': 'application/vnd.ms-powerpoint.template.macroEnabled.12',
	'_potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
	'_ppa': 'application/vnd.ms-powerpoint',
	'_ppam': 'application/vnd.ms-powerpoint.addin.macroEnabled.12',
	'_ppm': 'image/x-portable-pixmap',
	'_pps': 'application/vnd.ms-powerpoint',
	'_ppsm': 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
	'_ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
	'_ppt': 'application/vnd.ms-powerpoint',
	'_pptm': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
	'_pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'_prf': 'application/pics-rules',
	'_prm': 'application/octet-stream',
	'_prx': 'application/octet-stream',
	'_ps': 'application/postscript',
	'_psc1': 'application/PowerShell',
	'_psd': 'application/octet-stream',
	'_psess': 'application/xml',
	'_psm': 'application/octet-stream',
	'_psp': 'application/octet-stream',
	'_pub': 'application/x-mspublisher',
	'_pwz': 'application/vnd.ms-powerpoint',
	'_qht': 'text/x-html-insertion',
	'_qhtm': 'text/x-html-insertion',
	'_qt': 'video/quicktime',
	'_qti': 'image/x-quicktime',
	'_qtif': 'image/x-quicktime',
	'_qtl': 'application/x-quicktimeplayer',
	'_qxd': 'application/octet-stream',
	'_ra': 'audio/x-pn-realaudio',
	'_ram': 'audio/x-pn-realaudio',
	'_rar': 'application/octet-stream',
	'_ras': 'image/x-cmu-raster',
	'_rat': 'application/rat-file',
	'_rc': 'text/plain',
	'_rc2': 'text/plain',
	'_rct': 'text/plain',
	'_rdlc': 'application/xml',
	'_resx': 'application/xml',
	'_rf': 'image/vnd.rn-realflash',
	'_rgb': 'image/x-rgb',
	'_rgs': 'text/plain',
	'_rm': 'application/vnd.rn-realmedia',
	'_rmi': 'audio/mid',
	'_rmp': 'application/vnd.rn-rn_music_package',
	'_roff': 'application/x-troff',
	'_rpm': 'audio/x-pn-realaudio-plugin',
	'_rqy': 'text/x-ms-rqy',
	'_rtf': 'application/rtf',
	'_rtx': 'text/richtext',
	'_ruleset': 'application/xml',
	'_s': 'text/plain',
	'_safariextz': 'application/x-safari-safariextz',
	'_scd': 'application/x-msschedule',
	'_sct': 'text/scriptlet',
	'_sd2': 'audio/x-sd2',
	'_sdp': 'application/sdp',
	'_sea': 'application/octet-stream',
	'_searchConnector-ms': 'application/windows-search-connector+xml',
	'_setpay': 'application/set-payment-initiation',
	'_setreg': 'application/set-registration-initiation',
	'_settings': 'application/xml',
	'_sgimb': 'application/x-sgimb',
	'_sgml': 'text/sgml',
	'_sh': 'application/x-sh',
	'_shar': 'application/x-shar',
	'_shtml': 'text/html',
	'_sit': 'application/x-stuffit',
	'_sitemap': 'application/xml',
	'_skin': 'application/xml',
	'_sldm': 'application/vnd.ms-powerpoint.slide.macroEnabled.12',
	'_sldx': 'application/vnd.openxmlformats-officedocument.presentationml.slide',
	'_slk': 'application/vnd.ms-excel',
	'_sln': 'text/plain',
	'_slupkg-ms': 'application/x-ms-license',
	'_smd': 'audio/x-smd',
	'_smi': 'application/octet-stream',
	'_smx': 'audio/x-smd',
	'_smz': 'audio/x-smd',
	'_snd': 'audio/basic',
	'_snippet': 'application/xml',
	'_snp': 'application/octet-stream',
	'_sol': 'text/plain',
	'_sor': 'text/plain',
	'_spc': 'application/x-pkcs7-certificates',
	'_spl': 'application/futuresplash',
	'_src': 'application/x-wais-source',
	'_srf': 'text/plain',
	'_SSISDeploymentManifest': 'text/xml',
	'_ssm': 'application/streamingmedia',
	'_sst': 'application/vnd.ms-pki.certstore',
	'_stl': 'application/vnd.ms-pki.stl',
	'_sv4cpio': 'application/x-sv4cpio',
	'_sv4crc': 'application/x-sv4crc',
	'_svc': 'application/xml',
	'_swf': 'application/x-shockwave-flash',
	'_t': 'application/x-troff',
	'_tar': 'application/x-tar',
	'_tcl': 'application/x-tcl',
	'_testrunconfig': 'application/xml',
	'_testsettings': 'application/xml',
	'_tex': 'application/x-tex',
	'_texi': 'application/x-texinfo',
	'_texinfo': 'application/x-texinfo',
	'_tgz': 'application/x-compressed',
	'_thmx': 'application/vnd.ms-officetheme',
	'_thn': 'application/octet-stream',
	'_tif': 'image/tiff',
	'_tiff': 'image/tiff',
	'_tlh': 'text/plain',
	'_tli': 'text/plain',
	'_toc': 'application/octet-stream',
	'_tr': 'application/x-troff',
	'_trm': 'application/x-msterminal',
	'_trx': 'application/xml',
	'_ts': 'video/vnd.dlna.mpeg-tts',
	'_tsv': 'text/tab-separated-values',
	'_ttf': 'application/octet-stream',
	'_tts': 'video/vnd.dlna.mpeg-tts',
	'_txt': 'text/plain',
	'_u32': 'application/octet-stream',
	'_uls': 'text/iuls',
	'_user': 'text/plain',
	'_ustar': 'application/x-ustar',
	'_vb': 'text/plain',
	'_vbdproj': 'text/plain',
	'_vbk': 'video/mpeg',
	'_vbproj': 'text/plain',
	'_vbs': 'text/vbscript',
	'_vcf': 'text/x-vcard',
	'_vcproj': 'Application/xml',
	'_vcs': 'text/plain',
	'_vcxproj': 'Application/xml',
	'_vddproj': 'text/plain',
	'_vdp': 'text/plain',
	'_vdproj': 'text/plain',
	'_vdx': 'application/vnd.ms-visio.viewer',
	'_vml': 'text/xml',
	'_vscontent': 'application/xml',
	'_vsct': 'text/xml',
	'_vsd': 'application/vnd.visio',
	'_vsi': 'application/ms-vsi',
	'_vsix': 'application/vsix',
	'_vsixlangpack': 'text/xml',
	'_vsixmanifest': 'text/xml',
	'_vsmdi': 'application/xml',
	'_vspscc': 'text/plain',
	'_vss': 'application/vnd.visio',
	'_vsscc': 'text/plain',
	'_vssettings': 'text/xml',
	'_vssscc': 'text/plain',
	'_vst': 'application/vnd.visio',
	'_vstemplate': 'text/xml',
	'_vsto': 'application/x-ms-vsto',
	'_vsw': 'application/vnd.visio',
	'_vsx': 'application/vnd.visio',
	'_vtx': 'application/vnd.visio',
	'_wav': 'audio/wav',
	'_wave': 'audio/wav',
	'_wax': 'audio/x-ms-wax',
	'_wbk': 'application/msword',
	'_wbmp': 'image/vnd.wap.wbmp',
	'_wcm': 'application/vnd.ms-works',
	'_wdb': 'application/vnd.ms-works',
	'_wdp': 'image/vnd.ms-photo',
	'_webarchive': 'application/x-safari-webarchive',
	'_webtest': 'application/xml',
	'_wiq': 'application/xml',
	'_wiz': 'application/msword',
	'_wks': 'application/vnd.ms-works',
	'_WLMP': 'application/wlmoviemaker',
	'_wlpginstall': 'application/x-wlpg-detect',
	'_wlpginstall3': 'application/x-wlpg3-detect',
	'_wm': 'video/x-ms-wm',
	'_wma': 'audio/x-ms-wma',
	'_wmd': 'application/x-ms-wmd',
	'_wmf': 'application/x-msmetafile',
	'_wml': 'text/vnd.wap.wml',
	'_wmlc': 'application/vnd.wap.wmlc',
	'_wmls': 'text/vnd.wap.wmlscript',
	'_wmlsc': 'application/vnd.wap.wmlscriptc',
	'_wmp': 'video/x-ms-wmp',
	'_wmv': 'video/x-ms-wmv',
	'_wmx': 'video/x-ms-wmx',
	'_wmz': 'application/x-ms-wmz',
	'_wpl': 'application/vnd.ms-wpl',
	'_wps': 'application/vnd.ms-works',
	'_wri': 'application/x-mswrite',
	'_wrl': 'x-world/x-vrml',
	'_wrz': 'x-world/x-vrml',
	'_wsc': 'text/scriptlet',
	'_wsdl': 'text/xml',
	'_wvx': 'video/x-ms-wvx',
	'_x': 'application/directx',
	'_xaf': 'x-world/x-vrml',
	'_xaml': 'application/xaml+xml',
	'_xap': 'application/x-silverlight-app',
	'_xbap': 'application/x-ms-xbap',
	'_xbm': 'image/x-xbitmap',
	'_xdr': 'text/plain',
	'_xht': 'application/xhtml+xml',
	'_xhtml': 'application/xhtml+xml',
	'_xla': 'application/vnd.ms-excel',
	'_xlam': 'application/vnd.ms-excel.addin.macroEnabled.12',
	'_xlc': 'application/vnd.ms-excel',
	'_xld': 'application/vnd.ms-excel',
	'_xlk': 'application/vnd.ms-excel',
	'_xll': 'application/vnd.ms-excel',
	'_xlm': 'application/vnd.ms-excel',
	'_xls': 'application/vnd.ms-excel',
	'_xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
	'_xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
	'_xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'_xlt': 'application/vnd.ms-excel',
	'_xltm': 'application/vnd.ms-excel.template.macroEnabled.12',
	'_xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
	'_xlw': 'application/vnd.ms-excel',
	'_xml': 'text/xml',
	'_xmta': 'application/xml',
	'_xof': 'x-world/x-vrml',
	'_XOML': 'text/plain',
	'_xpm': 'image/x-xpixmap',
	'_xps': 'application/vnd.ms-xpsdocument',
	'_xrm-ms': 'text/xml',
	'_xsc': 'application/xml',
	'_xsd': 'text/xml',
	'_xsf': 'text/xml',
	'_xsl': 'text/xml',
	'_xslt': 'text/xml',
	'_xsn': 'application/octet-stream',
	'_xss': 'application/xml',
	'_xtp': 'application/octet-stream',
	'_xwd': 'image/x-xwindowdump',
	'_z': 'application/x-compress',
	'_zip': 'application/x-zip-compressed'
};


module.exports = function () {

	function getMimeTypeFromFileExtension(fileExtension) {
		fileExtension = fileExtension.toLowerCase();

		if (fileExtension.indexOf('.') === 0) {
			fileExtension = fileExtension.substr(1, fileExtension.length);
		}

		if (list['_' + fileExtension]) {
			return list['_' + fileExtension];
		}

		return "unknown";
	}

	return {
		getMimeTypeFromFileExtension: getMimeTypeFromFileExtension
	}
}();
