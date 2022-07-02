package server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.scalar.db.exception.transaction.TransactionException;
import java.io.IOException;

@RestController
public class GetOrderController {

    @GetMapping("/order/{orderId}")
    public OrderResponseDto getOrder(@PathVariable("orderId") String orderId) throws Exception {
        try (Repository repository = new Repository()) {
            return repository.getOrderById(orderId);
        }
    }
}
