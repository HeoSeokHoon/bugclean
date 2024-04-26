package com.winter.app.draft;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.winter.app.employee.DepartmentVO;
import com.winter.app.employee.EmployeeVO;
import com.winter.app.util.commons.FileManager;
import com.winter.app.util.pagination.Pagination;

@Service
public class DraftService {
	@Autowired
	private DraftDAO draftDAO;
	@Autowired
	private FileManager fileManager;
//	@Value("${app.upload,draftFile}")
//	private String uploadPath;
	///파일매니저에서 경로랑,파일
	//리턴으로 저장된파일명을 리턴받음

	public List<Map<String, Object>> getBasisDraft()throws Exception{
		return draftDAO.getBasisDraft();
	}
	public List<DepartmentVO> getDepartmentHighList()throws Exception{
		return draftDAO.getDepartmentHighList();
	}
	
	public int setRef(DraftVO draftVO,String [] refempnum)throws Exception{
		ReferencesVO [] referencesVOs = new ReferencesVO[refempnum.length];
		
		int result = 0;
		for(int i=0; i<referencesVOs.length;i++) {
			
			System.out.println("refNum : "+ refempnum[i]);	
			referencesVOs[i] = new ReferencesVO();
			referencesVOs[i].setDraft_num(draftVO.getDraft_num());
			referencesVOs[i].setEmployee_num(refempnum[i]);
			result = draftDAO.setRef(referencesVOs[i]);
		}
				
		return result;
	}
	
	//////////////////////////////////
	
	public int setBasisDraft(DraftVO draftVO)throws Exception{
		draftVO.setState(0L);
		draftVO.setNowapproval(1L);
		int result = draftDAO.setBasisDraft(draftVO);
		return result;
	}
	
	public int setSignCheck(String [] approvalemp_num, Long [] sign_rank,DraftVO draftVO)throws Exception{
		
		System.out.println("ddddddddddddddddddddddddddddddddddd11111");
		SignCheckVO [] signCheckVOs = new SignCheckVO[approvalemp_num.length];
		for(int i=0; i<approvalemp_num.length;i++) {
			signCheckVOs[i] = new SignCheckVO();
			System.out.println("ddddddddddddddddddddddddddddddddddd22222");

			signCheckVOs[i].setDraft_num(draftVO.getDraft_num());
			signCheckVOs[i].setEmployee_num(approvalemp_num[i]);
			signCheckVOs[i].setSign_rank(sign_rank[i]);
			LocalDate localDate = LocalDate.now();
			String date = localDate.toString();
			signCheckVOs[i].setSign_date(date);
			signCheckVOs[i].setSign_ref(0L);
			
			System.out.println("signCheckValue : " + signCheckVOs[i].toString());
			draftDAO.setSignCheck(signCheckVOs[i]);
		}
		
		return 1;
	}


	public List<Map<String, Object>> setApprovalLine(String [] orgCode, Map<String, Object> empMap )throws Exception{


		ApprovalLineVO approvalLineVO = new ApprovalLineVO();
		approvalLineVO = draftDAO.getApprovalMaxNum();
		
			//결재선의 리스트를 가져와서 approval_code의 값이 max인걸 가져옴
				//결재선테이블에 기안자 순서 먼저 넣기

		//결재선테이블에 기안자를 먼저 0번으로 넣어주고 나서 시작

		if(approvalLineVO == null) {
			ApprovalLineVO approvalLineVO2 = new ApprovalLineVO();
			approvalLineVO2.setApproval_line_code(1L);
			approvalLineVO2.setEmployee_num((String)empMap.get("EMPLOYEE_NUM"));
			approvalLineVO2.setLine_rank(0L);

			draftDAO.setApprovalLine(approvalLineVO2);
			for(int i=0; i<orgCode.length;i++) {
				approvalLineVO2.setApproval_line_code(1L);
				approvalLineVO2.setEmployee_num(orgCode[i]);
				approvalLineVO2.setLine_rank(Long.valueOf(i+1));
				draftDAO.setApprovalLine(approvalLineVO2);
			}

		}else {
			approvalLineVO.setApproval_line_code(approvalLineVO.getApproval_line_code()+1);
			approvalLineVO.setEmployee_num((String)empMap.get("EMPLOYEE_NUM"));
			approvalLineVO.setLine_rank(0L);



			draftDAO.setApprovalLine(approvalLineVO);
			for(int i=0; i<orgCode.length;i++) {
				approvalLineVO.setApproval_line_code(approvalLineVO.getApproval_line_code());
				approvalLineVO.setEmployee_num(orgCode[i]);
				approvalLineVO.setLine_rank(Long.valueOf(i+1));
				draftDAO.setApprovalLine(approvalLineVO);
			}
		}
    
		//결재선 목록에 저장한값을 불러오지 않았다면 결재선 CODE를 MAX값 + 로그인한 사람의 EMP_NUM을 조회해서 리스트로 뽑아옴..?
			ApprovalLineVO newApprovalLineVO = new ApprovalLineVO();
			newApprovalLineVO = draftDAO.getApprovalMaxNum();
			newApprovalLineVO.setApproval_line_code(newApprovalLineVO.getApproval_line_code());
			 newApprovalLineVO.setEmployee_num((String)empMap.get("EMPLOYEE_NUM"));
			List<Map<String, Object>> ar = draftDAO.getApprovalList(newApprovalLineVO);
			return ar;
		}
	
	public DraftVO getDraftDocNum() throws Exception{
		//localdate.now().split("-")+문서종류+기안서의 리스트의 DOC_NUM의 max값을 가져와 subString해서 시퀀스 번호에 해당하는부분 번호에+1?????????????
		 LocalDate localDate = LocalDate.now();
		 String [] localDateYear = localDate.toString().split("-");
		 Long parsingDm=0L;
		 	DraftVO draftVO = draftDAO.getDraftMaxDocNum();
		 	if(draftVO.getDraft_num().equals(null)) {
		 		draftVO.setDraft_num("0");
		 		 String Doc_num = draftVO.getDraft_num();
		 		Long.parseLong(Doc_num);
		 	}else {
		 	parsingDm = Long.parseLong(draftVO.getDraft_num());	
			}
		 	System.out.println("여기는 문서번호 결장하는 서비스 VO세팅전@@@@@@@@@@@@@@@@@@@");
		draftVO.setDraft_num(localDateYear[0]+"BS"+(parsingDm+1));
		draftVO.setDraft_num(draftVO.getDraft_num().toString());
		System.out.println("draftVO.getDraft_num() : " + draftVO.getDraft_num());
		draftVO.setDraft_date((localDate.now().toString()));
		System.out.println("여기는 문서번호 결장하는 서비스끝부분@@@@@@@@@@@@@@@@@@@");
		return draftVO;
	}
	
	public List<APListVO> setAPList(APListVO apListVO)throws Exception{
		 
		 int result = draftDAO.setAPList(apListVO);
		 
		 List<APListVO> ar = draftDAO.getAPList(apListVO);

		 return ar;
		 
	}
	
	///////////////////////////////////////////////////
	public List<APListVO> getAPList(APListVO apListVO)throws Exception{
		return draftDAO.getAPList(apListVO);
	}
	
	public List<ApprovalLineVO> getALDetail(ApprovalLineVO approvalLineVO)throws Exception{
		List<ApprovalLineVO> ar = draftDAO.getALDetail(approvalLineVO);
		return ar;
		
	}
	
	public List<DepartmentVO> getDepartmentList()throws Exception{
		return draftDAO.getDepartmentList();
	}
	
	public Map<String, Object> getEmployeeDetail(EmployeeVO employeeVO)throws Exception{
		return draftDAO.getEmployeeDetail(employeeVO);
	}
	
	public EmployeeVO getCEO()throws Exception{
		return draftDAO.getCEO();
	}
	
	public List<Map<String, Object>> getMyDraftList(Pagination pagination,EmployeeVO employeeVO)throws Exception{
				
		Long totalCount = draftDAO.getTotalCount(employeeVO);
		
		pagination.makeNum(totalCount);
		pagination.makeRow();
		Map<String, Object> map = new HashMap<>();
		map.put("EmployeeVO", employeeVO);
		map.put("Pagination", pagination);
	 	 List<Map<String, Object>> mapAr = draftDAO.getMyDraftList(map);
		
		return mapAr;
	}
	
}
