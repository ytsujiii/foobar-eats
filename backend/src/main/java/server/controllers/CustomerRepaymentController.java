package server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.scalar.db.exception.transaction.TransactionException;
import java.io.IOException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class CustomerRepaymentController {

    @RequestMapping(value = "/customer/repayment", method = RequestMethod.POST)
    public String repayment(
        @RequestBody CustomerRepaymentRequestDto repaymentRequestDto
    ) throws Exception {
        try (Repository repository = new Repository()) {
            repository.repayment(repaymentRequestDto.getCustomerId(), repaymentRequestDto.getAmount());
            return "{}";
        }
    }
}
