package server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.scalar.db.exception.transaction.TransactionException;
import java.io.IOException;
import java.util.ArrayList;

@RestController
public class GetOrdersByCustomerIdController {

    @GetMapping("/customer/{customerId}/order")
    public ArrayList<OrderResponseDto> getOrdersByCustomerId(@PathVariable("customerId") int customerId) throws Exception {
        try (Repository repository = new Repository()) {
            return repository.getOrdersByCustomerId(customerId);
        }
    }
}
